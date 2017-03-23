import * as React from 'react';
import { findDOMNode } from 'react-dom';
import { ScaleLinear, scaleLinear, max } from 'd3';
import { Estimate } from 'estimate/estimate.service';
import { Story } from 'story/story.service';

// Subcomponents
import { Histogram } from '../histogram/histogram.component';
import { VerticalLine } from '../vertical-line/vertical-line.component';
import { HorizontalAxis } from '../horizontal-axis/horizontal-axis.component';
import { CompoundLogNormal } from 'distributions/compound-log-normal';


import * as style from './estimate-preview.scss';


export interface EstimatePreviewProps {
  story: Story,
  samples: number,
  className?: string
};

export class EstimatePreview extends React.Component<EstimatePreviewProps, {}> {
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

  // Live-state like these are non-repeatable; they don't belong in
  // the global store.
  state = {
    width: 500,
    height: 200,
  }

  distribution() {
    return new CompoundLogNormal(
      this.props.story.estimates,
      this.props.samples
    );
  }

  // Set up the domain and range of the histogram. Some of this may
  // belong in LogNormal?
  setScales(distribution: CompoundLogNormal) {
    const maxDisplayDuration = Math.max(distribution.quantile(.99) + 1, 5);

    this.xScale = scaleLinear()
      .domain([0, maxDisplayDuration])
      .range([this.sideMargin, this.state.width - this.sideMargin]);

    this.yScale = scaleLinear()
      .range([0, this.state.height - this.bottomMargin])
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
    const story = this.props.story;
    const distribution = this.distribution();
    const values = distribution.dailyCounts();
    this.setScales(distribution);

    return (
      <div className={`${style.preview} ${this.props.className}`}>
        <svg className={style.svg}
          ref={(svg) => { this.svgElement = findDOMNode(svg) } }>
          <Histogram
            values={values.slice(0, 300)}
            xScale={this.xScale}
            yScale={this.yScale}
            transitionDuration={150}
            barClass={style.bar} />
          <HorizontalAxis scale={this.xScale} yOffset={this.yScale.range()[1]} />
          {story.started &&
            <VerticalLine
              x={this.xScale(story.daysSinceStarted)} y0={0} y1={this.state.height} />
          }
        </svg>
        <div className={style.specs}>{this.props.story.timeRange}</div>
      </div>
    );
  }
}
