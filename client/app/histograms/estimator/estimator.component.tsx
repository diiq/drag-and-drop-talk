import * as React from 'react';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import { debounce } from 'lodash';

import { findDOMNode } from 'react-dom';
import { select, drag, mouse, ScaleLinear, scaleLinear, max, event as d3Event } from 'd3';
import { Estimate } from '../../estimate/estimate.service';

// Subcomponents
import { Histogram } from '../histogram/histogram.component';
import { DraggableVerticalLine } from '../draggable-vertical-line/draggable-vertical-line.component';
import { VerticalLine } from '../vertical-line/vertical-line.component';
import { LogNormal } from '../../distributions/log-normal';
import { HorizontalAxis } from '../horizontal-axis/horizontal-axis.component';
import { DebouncedInput } from '../../debounced-input/debounced-input.component';

import * as style from './estimator.scss';


export interface EstimatorProps {
  mode: number,
  ninety: number,
  currentDays?: number,
  samples: number,
  className?: string,
  onChange(mode: number, ninety: number): void
};

@observer
export class Estimator extends React.Component<EstimatorProps, {}> {
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
  bottomMargin = 20;

  // Live-state like these are non-repeatable; they don't belong in
  // the global store.
  state = {
    dragging: false,
    width: 500,
    height: 200,
    mode: 5,
    ninety: 10
  }

  componentWillMount() {
    this.setState({ mode: this.props.mode, ninety: this.props.ninety });
  }

  componentWillReceiveProps(nextProps: EstimatorProps) {
    this.setState({ mode: nextProps.mode, ninety: nextProps.ninety });
  }

  // Sometimes the props can be not-numbers. ensure methods make sure
  // there's a reasonable graph no matter what.

  ensureMode() {
    return this.state.mode || .25;
  }

  ensureNinety() {
    return this.state.ninety || this.ensureMode() + 5;
  }

  //--

  distribution() {
    return new LogNormal(
      this.ensureMode(),
      this.ensureNinety(),
      this.props.samples
    );
  }

  // Set up the domain and range of the histogram. Some of this may
  // belong in LogNormal?
  setScales(distribution: LogNormal) {
    if (!this.state.dragging) {
      const maxDisplayDuration = Math.max(distribution.quantile(.99) + 1, 5);

      this.xScale = scaleLinear()
        .domain([0, maxDisplayDuration])
        .range([this.sideMargin, this.state.width - this.sideMargin]);
    }

    this.yScale = scaleLinear()
      .range([0, this.state.height - this.bottomMargin])
      .domain([0, max(distribution.dailyCounts())]);
  }


  // DRAGGING THE LINES
  // d3 drag code is a little verbose, but this is a lot of code to say,
  // "call ninetyDragged() when soemone drags the ninety line" and ditto
  // for the mode line

  dragMode(comp: React.ReactInstance) {
    var line = findDOMNode(comp)
    select(line)
      .call(drag()
        .on("start", this.dragStarted)
        .on("drag", this.modeDragged)
        .on("end", this.dragEnded))
  }

  dragNinety(comp: React.ReactInstance) {
    var line = findDOMNode(comp)
    select(line)
      .call(drag()
        .on("start", this.dragStarted)
        .on("drag", this.ninetyDragged)
        .on("end", this.dragEnded))
  }

  dragStarted = (__: any) => {
    d3Event.sourceEvent.stopPropagation()
    this.setState({ dragging: true });
  }

  mouseXCoord() {
    // This is a helper that returns the mouse location relative as
    // measured on the histogram's x axis.
    return this.xScale.invert(mouse(this.svgElement as HTMLElement)[0]);
  }

  ninetyDragged = () => {
    if (d3Event.x) {
      var newNinety = this.mouseXCoord();

      this.setNinety(newNinety)
    }
  }

  modeDragged = () => {
    if (d3Event.x) {
      var newMode = this.mouseXCoord();
      this.setMode(newMode);
    }
  }

  dragEnded = () => {
    this.setState({ dragging: false });
    this.props.onChange(this.state.mode, this.state.ninety)
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

  // Update AppState as the estimate changes

  handleNinetyChange = (value: string) => {
    this.setNinety(parseFloat(value));
    this.debounceSave();
  }

  handleModeChange = (value: string) => {
    this.setMode(parseFloat(value));
    this.debounceSave();
  }

  discretize(n: number) {
    return Math.round(n * 4) / 4;
  }

  @action
  setMode(newMode: number) {
    newMode = this.discretize(Math.max(.25, newMode));
    const newNinety = Math.max(newMode + 0.25, this.state.ninety);
    this.setState({ ninety: newNinety, mode: newMode })
  }

  @action
  setNinety(newNinety: number) {
    newNinety = this.discretize(Math.max(.5, newNinety));
    const newMode = Math.min(newNinety - 0.25, this.state.mode);
    this.setState({ ninety: newNinety, mode: newMode })
  }

  debounceSave = debounce(() => this.props.onChange(this.state.mode, this.state.ninety), 1000)

  // Transitions are nice, but that can make the graph feel sluggish
  // while dragging. Change the duration to keep things snappy while
  // dragging but pretty when resizing.
  lineTransitionDuration() {
    return this.state.dragging ? 0 : 500
  }

  graphTransitionDuration() {
    return this.state.dragging ? 50 : 500
  }

  render() {
    const distribution = this.distribution();
    const values = distribution.dailyCounts();
    this.setScales(distribution);

    return (
      <div className={this.props.className}>
        <svg className={style.svg}
          ref={(svg) => { this.svgElement = findDOMNode(svg) } }>
          <Histogram
            values={values.slice(0, 300)}
            xScale={this.xScale}
            yScale={this.yScale}
            transitionDuration={this.graphTransitionDuration()} />
          <DraggableVerticalLine
            ref={this.dragMode.bind(this)}
            x={this.xScale(this.ensureMode())} y0={0} y1={this.state.height}
            transitionDuration={this.lineTransitionDuration()} />
          <DraggableVerticalLine
            ref={this.dragNinety.bind(this)}
            x={this.xScale(this.ensureNinety())} y0={0} y1={this.state.height}
            transitionDuration={this.lineTransitionDuration()} />
          {this.props.currentDays &&
            <VerticalLine
              x={this.xScale(this.props.currentDays)} y0={0} y1={this.state.height}
              transitionDuration={this.lineTransitionDuration()} />
          }
          <HorizontalAxis scale={this.xScale} yOffset={this.yScale.range()[1]} />
        </svg>
      </div >
    );
  }
}
