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
  module: {
    rules: [
      {
        test: /\.js?$/,
        enforce: 'pre',
        use: [{
          loader: 'eslint-loader', 
          options: { fix: true }
        }],
        include: path.resolve(__dirname, './src/**/*.js'),
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}