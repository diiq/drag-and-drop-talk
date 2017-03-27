import * as React from 'react';
//import * as style from './title-text-and-image.scss';

export interface TitleTextAndImageProps { title: JSX.Element, text: JSX.Element, image: string };

export class TitleTextAndImage extends React.Component<TitleTextAndImageProps, {}> {
  render() {
    return (
      <div className="slide basic-slide">
        <div className="title"><h1>{this.props.title}</h1></div>
        <div className="content two-columns">
          <div>{this.props.text}</div>
          <div><img src={this.props.image} /></div>
        </div>
      </div>
    );
  }
}
