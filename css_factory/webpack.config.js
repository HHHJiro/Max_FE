var webpack = require('webpack') // to access built-in plugins 
require('html-webpack-plugin') // installed via npm
var path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const Ex = require('extract-text-webpack-plugin')

const config = {
  entry: require('./entry.config.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].css' // 产生css文件
  },
  devServer: {
    hot: true, // 告诉 dev-server 我们在使用 HMR
    port: 4088,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: Ex.extract([{
          loader: 'css-loader'
        }, {
          loader: 'postcss-loader'
        }])
      },
      {
        test: /\.scss$/,
        use: Ex.extract([{
          loader: 'css-loader',
          options: {
            // minimize: true, // css压缩
            sourceMap: true
          }
        }, {
          loader: 'postcss-loader',
          options: {
            sourceMap: true
          }
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }])
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']), // 清理dist目录
    new Ex('[name].css')
  ]
}
module.exports = config
