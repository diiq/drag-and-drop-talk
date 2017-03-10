const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: [
    './polyfills.ts',
    './app/main.tsx'
  ],

  output: {
    path: __dirname + '/build',
    filename: 'app.js'
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    modules: ['./app', './node_modules']
  },

  module: {
    loaders: [
      // Using awesome-ts instead of ts-loader because it improves
      // build speed.
      {
        test: /\.tsx?$/,
        loaders: ['awesome-typescript-loader'],
        exclude: /\.d\.ts/
      },
      // Image assets are hashed to allow cache-busting on deploy.
      {
        test: /\.(jpg|png|svg|gif)$/,
        //        loaders: ['file-loader?name=img/img-[hash:6].[ext]']
        loaders: ['file-loader?name=img/[name].[ext]']
      },

      // Sass for nesting & functions. css-modules munges all the
      // classnames and puts them in the module's exports (with
      // typings!) so we can refer to them in our tsx/jsx.
      {
        test: /\.scss$/,
        exclude: /common-styles/,
        loaders: [
          'style-loader',
          // 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]}',
          'typings-for-css-modules-loader?modules&namedExport&camelCase&localIdentName=[name]__[local]___[hash:base64:5]',
          'sass-loader?sourceMap'
        ]
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.html$/,
        loaders: ['html-loader']
      }
    ]
  },

  plugins: [
    // This takes the index.html file and injects our scripts.
    new HtmlWebpackPlugin({
      template: './app/index.html',
      inject: false
    }),

    new webpack.WatchIgnorePlugin([
      /\.d\.ts$/
    ]),
  ]
};
