const base = require('./webpack.config.base');
const _ = require('lodash');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const ROOT = path.resolve(__dirname, '..');

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [ROOT].concat(args));
}

var dev = _.merge({}, base, {
  output: {
    path: root('/build/estimation')
  }
});


dev.plugins.push(
 new webpack.DefinePlugin({PRODUCTION: true})
);

module.exports = dev;
