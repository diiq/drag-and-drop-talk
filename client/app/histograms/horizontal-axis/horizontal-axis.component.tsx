import * as React from 'react';
import { select, axisBottom } from 'd3';

export interface HorizontalAxisProps {
  scale: d3.ScaleLinear<number, number>,
  yOffset: number
  fakeout?: number
};

export class HorizontalAxis extends React.Component<HorizontalAxisProps, {}> {
  group: Element;

  buildAxis() {
    if (this.group) {
      let axis = select(this.group).data([{}]);
      // This double assertion is a real bummer, but the d3 types are
      // not quite right, and don't know that a transition can be used
      // wherever a selection can.
      let transition = axis.attr("transform", "translate(" + 0 + "," + this.props.yOffset + ")")
        .transition().duration(500) as any as d3.Selection<Element, {}, null, undefined>
      transition.call(axisBottom(this.props.scale).ticks(this.ticks())
        .tickFormat(this.tickFormat.bind(this)));
    }
  }

  max() {
    // The largest value on the scale
    return this.props.scale.domain()[1]
  }

  ticks() {
    let days = this.max();
    return days < 60 ? days : days / 5;
  }

  tickFormat(d: number) {
    let nth = this.max() < 60 ? 5 : 20;
    // Label every 5th business day (week) or 20th (month) if scale is large.
    if (d % nth == 0)
      return (d + (this.props.fakeout || 0)).toString()
    else
      return ""
  }

  componentDidUpdate(newProps: HorizontalAxisProps) {
    this.buildAxis();
  }

  componentDidMount(newProps: HorizontalAxisProps) {
    this.buildAxis();
  }

  render() {
    return <g ref={(ref) => { this.group = ref }}></g>
  }
}
