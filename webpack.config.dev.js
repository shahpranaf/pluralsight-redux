const webpack = require("webpack");
const path = require("path");
const HtmlwebpackPlugin = require("html-webpack-plugin");

process.env.NODE_ENV = "development";

module.exports = {
  mode: "development",
  target: "web",
  devtool: "cheap-module-source-map",
  entry: "./src/index.js", // its default by webpack
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    filename: "bundle.js"
  },
  devServer: {
    stats: "minimal",
    overlay: true, // errors that occur in browser
    historyApiFallback: true, // all request will be send to index.js. We can load deep links handle by react router
    disableHostCheck: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    https: false
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.API_URL": JSON.stringify("http://localhost:3001")
    }),
    new HtmlwebpackPlugin({
      template: "src/index.html",
      favicon: "src/favicon.ico"
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader", "eslint-loader"] // bottom up - runs eslint first and then babel loader
      },
      {
        test: /(\.css)$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};
