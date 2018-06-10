import * as React from 'react';
//import * as style from './title-text-and-image.scss';
import { CompoundLogNormal } from 'distributions/compound-log-normal';
import { DistributionHistogram } from 'histograms/distribution-histogram/distribution-histogram.component';


export interface TitleTextAndImageProps { title: JSX.Element, text: JSX.Element, image: string };

export class TitleTextAndImage extends React.Component<TitleTextAndImageProps, {}> {

  distribution = new CompoundLogNormal([{ mode: 20, extreme: 60 }])

  render() {
    return (
      <div className="slide basic-slide">
        <div className="title"><h1>{this.props.title}</h1></div>
        <div className="content two-columns">
          <div>{this.props.text}</div>
          <div><DistributionHistogram distribution={this.distribution} /></div>
        </div>
      </div>
    );
  }
}
