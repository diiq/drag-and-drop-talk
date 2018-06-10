// External CSS files
require('font-awesome/css/font-awesome.min.css');
require('react-select/dist/react-select.css');
require('styles/base.css');

import * as React from 'react';
import { routes } from 'routes';
import { Router } from 'router';
import { NotFound } from 'not-found/not-found';
import { Helmet } from 'react-helmet';

// Components
import { FocusRoot } from 'focus';

import { styles, vars, centeredBox } from 'styles/css';

export interface AppProps { };


export class App extends React.Component<AppProps, {}> {
  state = {
    error: false
  }

  componentDidCatch() {
    // Display fallback UI. TODO display the error, report the error, etc.
    this.setState({ error: true });
  }

  render() {
    if (this.state.error) {
      return <div {...style.error}><h1>Sorry! Something has gone wrong.</h1><p>An error occurred, and the only way to get back on track is to refresh the page, or return <a href="https://www.vistimo.com">home</a>.</p></div>;
    }
    return (
      <FocusRoot>
        <Helmet>
          <title>Pigmentor</title>
        </Helmet>
        <Router routes={routes} notFound={<NotFound />} />
      </FocusRoot>
    );
  }
}

const style = styles({
  error: {
    ...centeredBox,
    padding: vars.spacing * 2,
    height: 'auto !important',
    fontSize: 18,
    textAlign: 'center',
    ' h1': {
      color: vars.color.warn
    }
  }
})