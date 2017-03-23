import * as React from 'react';
import { findDOMNode } from 'react-dom';
import * as style from './draggable-vertical-line.scss';
import { merge } from 'lodash';
import { select } from 'd3';

export interface DraggableVerticalLineProps {
  x: number,
  y0: number,
  y1: number,
  xOffset?: number,
  transitionDuration?: number
};

export class DraggableVerticalLine extends React.Component<DraggableVerticalLineProps, {}> {
  state: DraggableVerticalLineProps;

  public static defaultProps = {
    xOffset: 0,
    transitionDuration: 0
  };

  polyPoints(pts: number[][]) {
    return pts.map(p => p.join(",")).join(" ");
  }

  leftPoints() {
    var x = -3;
    var center = (this.props.y0 + this.props.y1 / 2);
    var tri = [[x, center - 4], [x, center + 4], [x - 4, center]];
    return this.polyPoints(tri);
  }

  rightPoints() {
    var x = +3;
    var center = (this.props.y0 + this.props.y1 / 2);
    var tri = [[x, center - 4], [x, center + 4], [x + 4, center]];
    return this.polyPoints(tri);
  }

  height() {
    return this.state.y1 - this.state.y0;
  }

  constructor(props: DraggableVerticalLineProps) {
    super(props);
    this.state = merge({}, this.props);
  }

  componentWillEnter(callback: () => void) {
    this.setState(this.props);
    callback();
  }

  componentWillReceiveProps(nextProps: DraggableVerticalLineProps) {
    let node = select(findDOMNode(this));
    node.transition().duration(nextProps.transitionDuration)
      .attr("transform", `translate(${nextProps.x + nextProps.xOffset}, 0)`)
      .on('end', () => {
        this.setState(this.props);
      });
  }

  render() {
    return <g transform={`translate(${this.state.x + this.state.xOffset}, 0)`
    }>
      <line className={style.line}
        x1={0}
        x2={0}
        y1={this.state.y0}
        y2={this.state.y1} />
      <polygon className={style.triangle} points={this.leftPoints()} />
      <polygon className={style.triangle} points={this.rightPoints()} />
      <rect className={style.handle} x={-7} y={this.state.y0} width={14} height={this.height()} />
    </g >;
  }
}
