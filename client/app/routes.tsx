import * as React from 'react';
import { Route, IndexRedirect, RouterState } from 'react-router';

import { RouteWrapper } from 'route-wrapper.component';
import { App } from 'app.component';
import { Home } from 'home/home.component';
import API from './api/api';


export default (
  <Route path="/" component={RouteWrapper}>
    <IndexRedirect to="/home" />
    <Route path="/home" component={Home} />
  </Route>
);
