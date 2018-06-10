import * as React from 'react';
//import * as style from './welcome.scss';

export interface WelcomeProps { name: string };

export class Welcome extends React.Component<WelcomeProps, {}> {
  render() {
    return <h1>Hello from {this.props.name}!</h1>;
  }
}
