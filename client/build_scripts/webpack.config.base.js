const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const revision = require('child_process').execSync('git rev-parse HEAD').toString().trim()

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
        loaders: ['file-loader?name=img/img-[hash:6].[ext]']
        //loaders: ['file-loader?name=img/[name].[ext]']
      },
      {
        test: /\.(mp4)$/,
        loaders: ['file-loader?name=videos/mov-[hash:6].[ext]']
        //loaders: ['file-loader?name=img/[name].[ext]']
      },
      // Font assets
      {
        test: /\.(eot|woff|woff2|ttf)$/,
        loaders: ['file-loader']
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
      inject: 'head'
    }),
    new webpack.DefinePlugin({
      RELEASE: '"'+revision.slice(0, 6)+'"'
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/)
  ]
};
