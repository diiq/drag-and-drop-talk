const webpackConfig = require('./webpack.config.test');
const _ = require('lodash');

// PhantomJS *never* produces sourcemapped stack traces; but this
// line at least allows us to get stack traces from Chrome.
require('source-map-support').install();

var karmaConf = {
  basePath: '../',
  frameworks: ['jasmine', 'source-map-support'],

  // list of files / patterns to load in the browser
  files: [
    './build_scripts/test.ts'
  ],

  // list of files to exclude
  exclude: [
    'node-modules'
  ],

  reporters: ['dots'],

  // https://github.com/angular/angular-cli/issues/2125
  mime: {
    'text/x-typescript': ['ts']
  },

  // preprocess matching files before serving them to the browser
  // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
  preprocessors: {
    '**/*.ts': ['webpack']
  },

  webpack: webpackConfig,

  webpackMiddleware: {
    // Shhhhh
    stats: 'errors-only',
    quiet: true,
    progress: false,
    debug: false
  },

  // test results reporter to use
  // possible values: 'dots', 'progress'
  // available reporters: https://npmjs.org/browse/keyword/karma-reporter


  port: 9876,

  colors: true,

  // how many browsers should be started simultaneous
  concurrency: Infinity
};


if (process.argv.indexOf("watch") != -1) {
  module.exports = function(config) {
    config.set(_.merge({}, karmaConf, {

    // Config options specifically for phantom watcher
      autoWatch: true,
      singleRun: false,
      logLevel: config.LOG_DISABLE,
      browsers: ['PhantomJS']

    }));
  };
} else {
  module.exports = function(config) {
    config.set(_.merge({}, karmaConf, {

      // Config options for one-shot test run
      singleRun: true,
      autoWatch: false,
      browsers: ['Chrome']

    }));
  };
}
