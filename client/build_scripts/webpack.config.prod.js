const base = require('./webpack.config.base');
const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const ROOT = path.resolve(__dirname, '..');

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [ROOT].concat(args));
}

var prod = Object.assign({}, base, {
  output: {
    path: root('/build'),
    filename: 'app.[hash:6].js'
  }
});

prod.plugins.push(
  new webpack.DefinePlugin({
    PRODUCTION: true,
    "process.env": { 
      NODE_ENV: JSON.stringify("production") 
    }
  })
);
prod.plugins.unshift(
  new UglifyJSPlugin({
    uglifyOptions: {
      output: {
        "ascii_only": true
      }
    }
  })
);

module.exports = prod;
