const path = require('path');
const common = require('./webpack.common.js');
const { merge } = require('webpack-merge');

module.exports = merge(common, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 9000,
    open: true,
    historyApiFallback: true, // hanya kalau lo pakai SPA router tanpa hash
    client: {
      overlay: {
        errors: true,
        warnings: true,
      },
    },
  },
});
