import * as React from 'react';
//import * as style from './take-home.scss';

export interface TakeHomeProps { text: JSX.Element };

export class TakeHome extends React.Component<TakeHomeProps, {}> {
  render() {
    return <div className="slide basic-slide takehome">
      <div className="content">{this.props.text}</div>
    </div>;
  }
}
