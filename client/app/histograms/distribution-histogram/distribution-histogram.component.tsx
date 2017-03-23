import * as React from 'react';
import { EstimateService, EstimateJSON } from 'estimate/estimate';
import { Distribution } from 'distributions/distribution';
import { Histogram } from 'histograms/histogram/histogram.component';
import { VerticalLine } from 'histograms/vertical-line/vertical-line.component';
import { HorizontalAxis } from 'histograms/horizontal-axis/horizontal-axis.component';
import { ScaleLinear, scaleLinear, max } from 'd3';
import { findDOMNode } from 'react-dom';

import * as style from './distribution-histogram.scss';

export interface DistributionHistogramProps {
  distribution: Distribution,
  max?: number,
  fakeout?: number
};

export class DistributionHistogram extends React.Component<DistributionHistogramProps, {}> {
  state: {
    estimates: EstimateJSON[]
    width: number,
    height: number
  } = {
    estimates: [],
    width: 500,
    height: 400
  }

  // Hold on to the svg element so we can refer to its size, esp. after
  // window resizes.
  svgElement: Element;
  // These scales are calculated from incoming props, but we cache
  // them so's we can hand them to several differen sub-components.
  // *might* be good to put these into LogNormal.
  xScale: ScaleLinear<number, number>;
  yScale: ScaleLinear<number, number>;
  // We need a little space on the sides and bottom of the svg in order
  // to draw the axis. These numbers, in pixels, define that space.
  sideMargin = 5;
  bottomMargin = 18;
  topMargin = 50;

  distribution() {
    return this.props.distribution;
  }

  // Set up the domain and range of the histogram. Some of this may
  // belong in LogNormal?
  setScales(distribution: Distribution) {
    const maxDisplayDuration = this.props.max || Math.max(distribution.quantile(.99) + 1, 5);

    this.xScale = scaleLinear()
      .domain([0, maxDisplayDuration])
      .range([this.sideMargin, this.state.width - this.sideMargin]);

    this.yScale = scaleLinear()
      .range([0 + this.topMargin, this.state.height - this.bottomMargin])
      .domain([0, max(distribution.dailyCounts())]);
  }


  // RESIZING THE WINDOW

  // Because we're rendering everything in *pixels*, we must rerender
  // whenever the svg changes size. That *often* accompanies a windo
  // resize. There are other times, but we'll cross those bridges when
  // we come to them.

  setSize() {
    // Call when the object resizes
    this.setState({
      width: this.svgElement.clientWidth,
      height: this.svgElement.clientHeight
    });
  }

  componentDidMount() {
    this.setSize = this.setSize.bind(this);
    this.setSize();
    window.addEventListener("resize", this.setSize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.setSize);
  }

  render() {
    const distribution = this.distribution();
    const values = distribution.dailyCounts();
    this.setScales(distribution);

    return (
      <div className={`${style.preview}`}>
        <svg className={style.svg}
          ref={(svg) => { this.svgElement = findDOMNode(svg) }}>
          <Histogram
            values={values.slice(0, 300)}
            xScale={this.xScale}
            yScale={this.yScale}
            yOffset={this.topMargin}
            transitionDuration={150}
            barClass={style.bar} />
          <HorizontalAxis scale={this.xScale} yOffset={this.yScale.range()[1]} fakeout={this.props.fakeout || 0} />
        </svg>
      </div>
    );
  }
}
