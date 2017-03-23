import * as React from 'react';
import { findDOMNode } from 'react-dom';
import * as styles from './bar.scss';
import { select } from 'd3';
import { merge } from 'lodash';

export interface BarProps {
  x: number,
  y: number,
  width: number,
  height: number,
  transitionDuration?: number,
  className?: string
};

export class Bar extends React.Component<BarProps, {}> {
  state: BarProps;
  performCallbacks = true;

  constructor(props: BarProps) {
    super(props);
    this.state = merge({}, this.props);
  }

  componentWillUnmount() {
    this.performCallbacks = false;
  }

  componentWillReceiveProps(nextProps: BarProps) {
    let node = select(findDOMNode(this));

    node.transition().duration(nextProps.transitionDuration)
      .attr("x", nextProps.x)
      .attr("y", nextProps.y)
      .attr("width", nextProps.width)
      .attr("height", nextProps.height)
      .on('end', () => {
        if (this.performCallbacks)
          this.setState(nextProps)
      });
  }

  render() {
    return (
      <g>
        {this.state.height > 0 &&
         <circle className={styles.dot} cx={this.state.x+this.state.width/2} cy={this.state.y} r={this.state.width/5} />}
      <rect className={`${styles.bar} ${this.props.className}`}
        x={this.state.x}
        y={this.state.y}
        width={this.state.width}
        height={this.state.height} />
        </g>
    );
  }
}
