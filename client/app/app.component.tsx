import 'style-loader!css-loader!sass-loader!./common-styles/common.scss';

import * as React from 'react';
// import * as style from './app.scss';
import { Router } from 'react-router';
import routes from './routes';
import { history } from 'app-history';

export interface AppProps { };

export class App extends React.Component<AppProps, {}> {
  render() {
    return (
      <Router history={history} routes={routes} />
    );
  }
}
