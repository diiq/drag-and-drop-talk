require('scream');
require('brim');
require('platform');
import 'style-loader!css-loader!sass-loader!./common-styles/common.scss';

import { AppContainer } from 'react-hot-loader';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from 'app.component';

function render() {
  let App = require('app.component').App;
  const container = document.getElementById('brim-main');
  ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>,
    container);
}

document.addEventListener("DOMContentLoaded", function (event) {

  render();

  var scream,
    brim;

  if ((platform.os.family == 'iOS' && parseInt(platform.os.version, 10) > 8 || platform.ua.indexOf('like Mac OS X') != -1) && !navigator.userAgent.match('CriOS')) {
    scream = gajus.Scream({
      width: {
        portrait: 320,
        landscape: 568
      }
    });

    brim = gajus.Brim({
      viewport: scream
    });

    brim.on('viewchange', function (e) {
      if (e.viewName == "minimal")
        document.getElementById('paused').style.display = "block";

    });
  }
});


// Sloppy way to allow module.hot
declare var module: any;

if (module.hot) {
  module.hot.accept('app.component', render);
}
