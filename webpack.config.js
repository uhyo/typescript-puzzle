const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const { ContextReplacementPlugin } = webpack;

module.exports = (env, argv) => ({
  entry: "./src/index.tsx",
  devtool: argv.mode === "development" ? "inline-source-map" : undefined,
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
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
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin(["css/ress.min.css"]),
    new BundleAnalyzerPlugin(),
  ],
  devServer: {
    host: "0.0.0.0",
    hot: true,
  },
});
