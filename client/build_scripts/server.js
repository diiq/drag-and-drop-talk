var path = require('path');
var webpack = require('webpack');
var express = require('express');
var devMiddleware = require('webpack-dev-middleware');
var hotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config.dev');


var app = express();
var compiler = webpack(config);

app.use(devMiddleware(compiler, {
  publicPath: config.output.publicPath,
  historyApiFallback: false,
  stats: {
    colors: true,
    chunks: false
  }
}));

app.use(hotMiddleware(compiler));

app.get('/estimation/index.html', function (req, res) {
  res.sendFile(path.join(__dirname, '../app/index.html'));
});

app.listen(3000, function (err) {
  if (err) {
    return console.error(err);
  }

  console.log('Listening at http://localhost:3000/');
});
