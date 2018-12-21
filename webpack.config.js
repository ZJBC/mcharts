const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: './index.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: './'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    inline:true,
    hot:true,
    // compress: true,
    stats: "errors-only",
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.js$/,
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
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      filename: 'index.html',
      template: './index.html'
    }),
  ]
}