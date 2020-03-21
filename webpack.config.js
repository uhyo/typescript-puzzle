const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const PwaManifest = require("webpack-pwa-manifest");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const WorkboxPlugin = require("workbox-webpack-plugin");
const { ContextReplacementPlugin } = webpack;

module.exports = (env, argv) => {
  const isDev = argv.mode !== "production";
  return {
    entry: {
      app: "./src/index.tsx",
    },
    devtool: isDev ? "inline-source-map" : undefined,
    output: {
      path: path.join(__dirname, "dist"),
      filename: chunkData => {
        if (chunkData.chunk.name === "sw") {
          return "sw.js";
        } else {
          return !isDev ? "[name].[contenthash].js" : "[id].[name].js";
        }
      },
      chunkFilename: !isDev ? "[name].[contenthash].js" : "[id].[name].js",
    },
    optimization: {
      moduleIds: "hashed",
      // moduleIds: "deterministic",
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
      alias: {
        "~": path.join(__dirname, "src"),
      },
    },
    module: {
      rules: [
        { test: /\.tsx?$/, loader: "ts-loader" },
        {
          test: /\.svg$/,
          loader: "url-loader",
          options: {
            limit: 2048,
          },
        },
      ],
    },
    plugins: [
      new ContextReplacementPlugin(/typescript\/lib/, null),
      new HtmlWebpackPlugin({
        template: "html/index.html",
        excludeChunks: ["sw"],
        local: {
          ga: require("./scripts/googleAnalytics"),
        },
      }),
      new HtmlWebpackPlugin({
        template: "html/privacy.html",
        filename: "privacy.html",
        inject: false,
        local: {
          ga: require("./scripts/googleAnalytics"),
        },
      }),
      new CopyWebpackPlugin(["css/ress.min.css"]),
      new PwaManifest(require("./scripts/webManifest")),
      new ManifestPlugin(),
      new WorkboxPlugin.InjectManifest({
        swSrc: "./src/sw/index.ts",
        swDest: "sw.js",
        maximumFileSizeToCacheInBytes: isDev ? 20 * 1024 ** 2 : 1024 ** 2,
        dontCacheBustURLsMatching: /\.\w{16,}\./,
        // do not precache typescript compiler worker
        exclude: [/\.tsc\.worker\./],
      }),
    ].concat(
      isDev
        ? [new webpack.HotModuleReplacementPlugin()]
        : [new BundleAnalyzerPlugin()],
    ),
    devServer: {
      host: "0.0.0.0",
      hot: true,
    },
  };
};
