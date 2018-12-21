const webpack = require('webpack')
const path = require('path')
module.exports = {
  entry: './index.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}