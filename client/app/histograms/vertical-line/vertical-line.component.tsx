import * as React from 'react';
import { findDOMNode } from 'react-dom';
import * as style from './vertical-line.scss';
import { merge } from 'lodash';
import { select } from 'd3';

export interface VerticalLineProps {
  x: number,
  y0: number,
  y1: number,
  transitionDuration?: number
};

export class VerticalLine extends React.Component<VerticalLineProps, {}> {
  state: VerticalLineProps;

  public static defaultProps = {
    xOffset: 0,
    transitionDuration: 0
  };

  height() {
    return this.state.y1 - this.state.y0;
  }

  constructor(props: VerticalLineProps) {
    super(props);
    this.state = merge({}, this.props);
  }

  componentWillEnter(callback: () => void) {
    this.setState(this.props);
    callback();
  }

  componentWillReceiveProps(nextProps: VerticalLineProps) {
    let node = select(findDOMNode(this));
    node.transition().duration(nextProps.transitionDuration)
      .attr("transform", `translate(${nextProps.x}, 0)`)
      .on('end', () => {
        this.setState(this.props);
      });
  }

  render() {
    return <g transform={`translate(${this.state.x}, 0)`
    }>
      <line className={style.line}
        x1={0}
        x2={0}
        y1={this.state.y0}
        y2={this.state.y1} />
      <rect x={-this.state.x}
        y={this.state.y0}
        width={this.state.x}
        height={this.state.y1 - this.state.y0}
        className={style.shade} />
    </g >;
  }
}
