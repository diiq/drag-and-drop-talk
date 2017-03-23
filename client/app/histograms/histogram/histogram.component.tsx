import * as React from 'react';
import { histogram } from './histogram.scss';
import { Bar } from './bar/bar.component';
import * as ReactTransitionGroup from 'react-addons-transition-group';
import { ScaleLinear } from 'd3';



export interface HistogramProps {
  values: number[],
  xScale: d3.ScaleLinear<number, number>,
  yScale: d3.ScaleLinear<number, number>,
  xOffset?: number,
  yOffset?: number,
  barClass?: string,
  transitionDuration: number;
};

export class Histogram extends React.Component<HistogramProps, {}> {
  public static defaultProps = {
    xOffset: 0,
    yOffset: 0,
    transitionDuration: 0,
  };

  dimensionsForDayN(n: number, count: number) {
    const totalHeight = this.props.yScale.range()[1];
    return {
      x: this.props.xOffset + this.props.xScale(n),
      y: this.props.yOffset + totalHeight - this.props.yScale(count),
      width: this.props.xScale(1) - this.props.xScale(0),
      height: this.props.yScale(count) - this.props.yOffset
    }
  }

  render() {
    return (
      <ReactTransitionGroup component="g" className={histogram}>
        {this.props.values.map((count: number, n: number) => {
          const dims = this.dimensionsForDayN(n, count);
          return (
            <Bar
              className={this.props.barClass || ''}
              key={n}
              x={dims.x}
              y={dims.y}
              width={dims.width}
              height={dims.height}
              transitionDuration={this.props.transitionDuration} />
          );
        })}
      </ReactTransitionGroup>
    );
  }
}
