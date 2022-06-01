const { merge } = require("webpack-merge");
const config = require("./webpack.config.js");
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
module.exports = merge(config, {
  mode: "production",
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
      },
    }),
    new CopyPlugin({ patterns: [{ from: "public", to: "public" }] }),
  ],
});
