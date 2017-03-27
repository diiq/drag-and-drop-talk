import * as React from 'react';
//import * as style from './just-text.scss';

export interface JustTextProps { text: JSX.Element };

export class JustText extends React.Component<JustTextProps, {}> {
  render() {
    return <div className="slide basic-slide just-text">
      <div className="content">{this.props.text}</div>
    </div>;
  }
}
