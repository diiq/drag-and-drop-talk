import * as React from 'react';
import { observer } from 'mobx-react';
import { object } from 'prop-types';
import { fastMove, perimeterScroller, framerateLoop } from './utils';

// CSS
import { styles, Style } from 'styles/css';

export interface DragContextProps {
  contextName: string
  // Scroll something other than body when dragging to edges of screen?
  xScroller?: () => Element
  yScroller?: () => Element
  css: Style
};

export interface DragPosition {
  x: number,
  y: number,
  left: number,
  top: number,
  mouseX: number,
  mouseY: number,
}

export interface DragLocation {
  // Centroid of the dragee
  x: number, y: number,
  // top corner of the dragee
  top: number, left: number,
  // Actual mouse pointer location
  mouseX: number, mouseY: number
}

export interface Actor {
  dragStart?: (monitor: any) => void,
  fastUpdate?: (location: DragLocation, monitor: any) => void,
  dragStop?: (monitor: any) => void
}

// This is what gets passed around in Context to connect all the DragActors to
// event callbacks.
export interface DragManager {
  addActor(id: string, props: Actor): void
  maybeStart(e: DragEvent): void
  cancelStart(): void
  start(e: DragEvent,
    ref: HTMLDivElement,
    render: () => JSX.Element,
    monitor: any,
    onDrop: (monitor: any) => void): void
  move(e: DragEvent): void
  drop(e: DragEvent): void
  removeActor(id: string, props: Actor): void
}

export type DragEvent = React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement> | TouchEvent | MouseEvent;

@observer
export class DragContext extends React.Component<DragContextProps, {}> {
  static childContextTypes = {
    dragManagers: object
  }
  static contextTypes = {
    dragManagers: object
  }
  static defaultProps = {
    xScroller: () => document.documentElement,
    yScroller: () => document.documentElement
  }

  state: {
    dragee?: () => JSX.Element,
    maybeStarting?: boolean
  } = {}

  manager: DragManager
  actors: { [key: string]: Actor } = {}
  dragee: HTMLDivElement
  hiddenDragee: HTMLDivElement
  pointerOffset: { x: number, y: number }
  oldDisplay: string
  monitor: any
  dragStart = { done: false }
  onDrop: (m: any) => void

  handlePreventTouchmoveWhenPanning = (event: any) => {
    if (this.state.dragee) {
      event.preventDefault();
    }
  };

  componentDidMount () {
    (window.document.body.addEventListener as any)('touchmove', this.handlePreventTouchmoveWhenPanning, {
      passive: false
    });
  }

  componentWillUnmount () {
    (window.document.body.removeEventListener as any)('touchmove', this.handlePreventTouchmoveWhenPanning, {
      passive: false
    });
  }

  otherManagers() {
    return this.context.dragManagers || {}
  }

  getChildContext() {
    const dragManagers = this.otherManagers();
    dragManagers[this.props.contextName] = {
      addActor: this.addActor,
      start: this.start,
      move: this.move,
      drop: this.drop,
      maybeStart: this.maybeStart,
      cancelStart: this.cancelStart,
      removeActor: this.removeActor
    };
    return { dragManagers };
  }

  componentDidUpdate() {
    const scroller = perimeterScroller(this.props.xScroller(), this.props.yScroller());
    this.actors["_scroller"] = {
      fastUpdate: scroller.scroll,
      dragStart: scroller.stop
    }
  }

  addActor = (id: string, props: Actor) => {
    this.actors[id] = props;
  }

  removeActor = (id: string, actor: Actor) => {
    if (this.actors[id] != actor) return;
    delete this.actors[id];
  }

  maybeStart = (e: DragEvent) => {
    this.setState({ maybeStart: true });
  }

  cancelStart = () => {
    this.setState({ maybeStart: false });
  }

  start = (e: DragEvent,
    ref: HTMLDivElement,
    dragRenderer: () => JSX.Element,
    monitor: any,
    onDrop: (m: any) => void
  ) => {
    // Prepare the env
    this.onDrop = onDrop;
    this.monitor = monitor;
    this.hiddenDragee = ref;
    this.setDrageeOffset(e, ref);

    // Place the draggable draggee
    this.setState({ dragee: dragRenderer });
    this.setDrageePosition(e);

    // Hide the undraggable dragee
    this.oldDisplay = this.hiddenDragee.style.display;
    this.hiddenDragee.style.display = "none";

    // Tell all the actors we're starting
    this.dragStart = framerateLoop(this.actorsArray(), (a: Actor) => a.dragStart && a.dragStart(this.monitor));

    // Don't do anything else.
    e.stopPropagation();
    e.preventDefault();
  }

  move = (e: DragEvent) => {
    if (!this.state.dragee) return;
    this.setDrageePosition(e);
    if (this.dragStart.done) {
      this.actActors(e);
    }
    e.stopPropagation();
    e.preventDefault();
  }

  drop = (e: DragEvent) => {
    this.setState({ dragee: null });
    if (!this.hiddenDragee) return;
    this.hiddenDragee.style.display = this.oldDisplay;
    this.actorsDo('dragStop', [this.monitor, this.richPosition(e)]);
    this.onDrop(this.monitor);
    this.monitor = null;
  }

  actorsDo(action: string, args: any[]) {
    Object.keys(this.actors).forEach(actorId => {
      if (this.actors[actorId][action]) {
        this.actors[actorId][action](...args);
      }
    });
  }

  actActors(e: DragEvent) {
    const position = this.richPosition(e);
    this.actorsDo('fastUpdate', [position, this.monitor]);
  }

  // Helpers

  actorsArray() {
    return Object.keys(this.actors).map(key => this.actors[key]);
  }

  richPosition(e: DragEvent) {
    const drageeSize = this.dragee.getBoundingClientRect();
    const pos = this.getEventPosition(e);
    this.pointerOffset
    return {
      x: pos.x + this.pointerOffset.x + drageeSize.width / 2 + this.props.xScroller().scrollLeft,
      y: pos.y + this.pointerOffset.y + drageeSize.height / 2 + this.props.yScroller().scrollTop,
      left: pos.x + this.pointerOffset.x,
      top: pos.y + this.pointerOffset.y,
      mouseX: pos.x,
      mouseY: pos.y
    }
  }

  isTouch(e: DragEvent): e is React.TouchEvent<any> | TouchEvent {
    return !!e['touches'];
  }

  previousPos = null as {x: number, y: number}
  getEventPosition(e: DragEvent) {
    var pos;
    if (this.isTouch(e)) {
      if (e.touches[0]) {
        pos = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      } else {
        pos = this.previousPos;
      }
    } else {
      pos = { x: e.clientX, y: e.clientY };
    }
    this.previousPos = pos;
    return pos;
  }

  setDrageePosition(e: DragEvent) {
    const pos = this.getEventPosition(e);
    const x = pos.x + this.pointerOffset.x;
    const y = pos.y + this.pointerOffset.y;
    fastMove(this.dragee, { x, y });
  }

  setDrageeOffset(e: DragEvent, ref: HTMLDivElement) {
    const pos = this.getEventPosition(e);
    const drageeLoc = ref.getBoundingClientRect();
    this.pointerOffset = {
      x: drageeLoc.left - pos.x,
      y: drageeLoc.top - pos.y
    }
  }

  setDragee = (r: HTMLDivElement) => {
    this.dragee = r;
  }

  render() {
    return (
      <div {...this.props.css} onMouseLeave={this.drop}>
        <div onMouseMove={this.move}
          ref={(r) => {
            if (!r) return;
            (r.addEventListener as any)("touchmove", this.move, {passive: false});
          }}
          onTouchEnd={this.drop} onTouchCancel={this.drop} onMouseUp={this.drop}
          {...style.dragLayer} style={{ pointerEvents: this.state.dragee ? 'all' : 'none' }} >

          <div {...style.dragee} ref={this.setDragee}>
            {this.state.dragee && this.state.dragee()}
          </div>
        </div>

        {this.props.children}

      </div>
    );
  }
}

let style = styles({
  dragLayer: {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 10000,
  },
  dragee: {
    position: 'absolute',
    top: 0,
    left: 0,
    userSelect: 'none',
    touchCallout: 'none'
  }
});
