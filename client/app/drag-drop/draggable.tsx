//
// for each droppable, give Location => FastUpdate (move over/get bigger if needed) and Location => DropUpdate
// for each draggable predrag fastupdate (if mobile aimate drag icon), startdrag fastupdate (hide it!), drag renderer (to be put in an transformed box)
// scrollbucket -> dimensions. dimensions

import * as React from 'react';
import { observer } from 'mobx-react';
import { object } from 'prop-types';
import { DragManager, DragEvent } from './drag-context';

// CSS
import { styles, CompiledStyle } from 'styles/css';

export interface DraggableProps {
  contextName: string
  monitor: any
  css?: CompiledStyle
  touchDelay?: number
  dragRender?: () => JSX.Element
  onDrop: (monitor: any) => void
  disabled?: boolean
};

@observer
export class Draggable extends React.Component<DraggableProps, {}> {
  static contextTypes = {
    dragManagers: object
  }
  ref: HTMLDivElement
  // True if a drag event has possibly started, but we have to wait through a delay to be sure.
  waitingToStartDrag = false;
  // True if we're actually dragging right now.
  currentlyDragging = false;
  // Mouse drags require the mouse to move a certain distance before it counts
  // as a drag. We store the initial click location for comparison.
  startLoc: { x: number, y: number }

  manager() {
    return this.context.dragManagers[this.props.contextName] as DragManager
  }

  // Touch events become drags if you longpress.
  onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    // We interact with this event after at timeout, so persist it.
    e.stopPropagation();
    e.preventDefault();
    e.persist();
    this.waitingToStartDrag = true;
    this.manager().maybeStart(e);
    // If we haven't moved after delay, then jump to dragging mode
    setTimeout(() => {
      if (!this.waitingToStartDrag) return;
      this.currentlyDragging = true;
      this.manager().start(e, this.ref, this.dragRenderer, this.props.monitor, this.props.onDrop);
    }, 100)
  }

  // Touch events don't act like drags if you move immediately; they become
  // drags after a long(ish) press.
  onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (this.waitingToStartDrag) {
      this.waitingToStartDrag = false;
      e.preventDefault();
      this.manager().cancelStart();
    } else if (this.currentlyDragging) {
      e.preventDefault();
      // Touch event remain with the object that the touch started on, so for
      // touch events, we have to transmit the event up to the manager.
      this.manager().move(e);
    }
  }

  onTouchCancel = (e: React.TouchEvent<HTMLDivElement>) => {
    if (this.waitingToStartDrag) {
      this.waitingToStartDrag = false;
      this.manager().cancelStart();
    } else if (this.currentlyDragging) {
      this.onPointerUp(e);
    }
  }

  onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button) return; // left clicks only!
    this.waitingToStartDrag = true;
    this.manager().maybeStart(e);
    this.startLoc = { x: e.clientX, y: e.clientY }
    e.stopPropagation();
  }

  onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!this.waitingToStartDrag) return;
    const dx = e.clientX - this.startLoc.x;
    const dy = e.clientY - this.startLoc.y;
    if (dx * dx + dy * dy > 16) {
      this.manager().start(e, this.ref, this.dragRenderer, this.props.monitor, this.props.onDrop);
      this.waitingToStartDrag = false;
    }
  }

  onPointerUp = (e: DragEvent) => {
    this.waitingToStartDrag = false;
    if (this.currentlyDragging) {
      this.manager().drop(e)
    }
    this.currentlyDragging = false;
  }

  dragRenderer = () => {
    if (this.props.dragRender) {
      return this.props.dragRender();
    } else {
      return <div {...style.wrapper} {...this.props.css}>
        {this.props.children}
      </div>
    }
  }

  setRef = (r: HTMLDivElement) => {
    this.ref = r;
  }

  render() {
    if (this.props.disabled) {
      return <div {...style.wrapper} {...this.props.css}>
        {this.props.children}
      </div>
    }
    return (
      <div ref={this.setRef}
        onMouseDown={this.onMouseDown}
        onTouchStart={this.onTouchStart}
        onTouchCancel={this.onTouchCancel}
        onMouseMove={this.onMouseMove}
        onTouchMove={this.onTouchMove}
        onMouseUp={this.onPointerUp}
        onTouchEnd={this.onPointerUp}
        {...style.wrapper}
        {...this.props.css}>
        {this.props.children}
      </div>
    );
  }
}

let style = styles({
  wrapper: {
    userSelect: 'none',
    touchCallout: 'none'
  }
});