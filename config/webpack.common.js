const paths = require('./paths');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    index: {
      import: paths.src + '/index.js'
    }
  },

  output: {
    filename: '[name].bundle.js',
    path: paths.dist,
    publicPath: '/'
  },

  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.public,
          to: 'assets',
          globOptions: {
            ignore: ['*.DS_Store']
          },
          noErrorOnMissing: true
        }
      ]
    }),
    new HtmlWebpackPlugin({
      title: 'Start template',
      favicon: paths.src + '/img/favicon.png',
      template: paths.src + '/template.html',
      filename: 'index.html'
    })
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            rootMode: 'upward'
          }
        }
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
        type: 'asset/inline'
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [paths.src, 'node_modules'],
    alias: {
      '@': paths.src,
      assets: paths.public
    }
  }
};
