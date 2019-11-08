const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.tsx",
  devtool: "inline-source-map",
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
    rules: [{ test: /\.tsx?$/, loader: "ts-loader" }],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "html/index.html",
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin(["css/ress.min.css"]),
  ],
  devServer: {
    host: "0.0.0.0",
    hot: true,
  },
};
