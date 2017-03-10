const webpack = require('webpack');
const base = require('./webpack.config.base');
const _ = require('lodash');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const { CheckerPlugin } = require('awesome-typescript-loader');

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [ROOT].concat(args));
}

var dev = _.merge({}, base, {
  devtool: 'eval-source-map',
  output: {
    publicPath: 'http://localhost:3000/'
  }
});

dev.entry.unshift('webpack-hot-middleware/client', 'webpack/hot/dev-server', 'react-hot-loader/patch');

dev.module.loaders[0].loaders.unshift('react-hot-loader/webpack');
dev.plugins.push(new webpack.HotModuleReplacementPlugin());
dev.plugins.push(new CheckerPlugin());
dev.plugins.push(
 new webpack.DefinePlugin({PRODUCTION: false})
);


module.exports = dev;
