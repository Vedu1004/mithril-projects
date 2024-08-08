const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "bin"),
    publicPath: "/bin/",
  },
  plugins: [
    new webpack.ProvidePlugin({
      m: "mithril",
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "/"),
    },
    hot: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
