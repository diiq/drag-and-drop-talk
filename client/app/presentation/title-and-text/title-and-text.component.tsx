import * as React from 'react';
//import * as style from './title-and-text.scss';

export interface TitleAndTextProps { title: JSX.Element, text: JSX.Element };

export class TitleAndText extends React.Component<TitleAndTextProps, {}> {
  render() {
    return (
      <div className="slide basic-slide">
        <div className="title"><h1>{this.props.title}</h1></div>
        <div className="content">
          {this.props.text}
        </div>
      </div>
    );
  }
}
