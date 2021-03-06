const path = require('path');

module.exports = {
  target: 'web',
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'wtc-sticker-book.es5.js',
    library: 'WTCStickerBook'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader"
      }
    ]
  }
}