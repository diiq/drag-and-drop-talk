import * as React from 'react';
//import * as style from './mode-ninety-estimate.scss';

export interface ModeNinetyEstimateProps { name: string };

export class ModeNinetyEstimate extends React.Component<ModeNinetyEstimateProps, {}> {
  render() {
    return <h1>Hello from {this.props.name}!</h1>;
  }
}
