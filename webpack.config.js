var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var loaders = [
  {
    "test": /\.jsx?$/,
    "exclude": /node_modules/,
    "loader": "babel-loader",
    "query": {
      "presets": [
        "babel-preset-es2015",
        "babel-preset-react",
        "babel-preset-stage-0"
      ],
      "plugins": [
        "babel-plugin-transform-decorators-legacy",
        "babel-plugin-transform-class-properties"
      ]
    }
  }
];

module.exports = {
  devtool: 'eval-source-map',
  entry: path.resolve('src', 'main.js'),
  output: {
    path: path.resolve('build'),
    filename: 'main.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('public', 'index.tpl.html'),
      filename: 'index.html',
      inject: false
    })
  ],
  module: {
    loaders: loaders
  }
};
