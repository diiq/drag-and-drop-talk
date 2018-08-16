
import * as React from 'react';
import { styles } from 'styles/css';
import { Draggable, fastMove, DragActor } from 'esdragon';
import { vars } from 'styles/css';
import { Link } from 'link/link';
import { css } from 'glamor';

export interface AccessibleDrageeProps {
  item: {
    text: string
    order: number
  }
  previousOrder: number
  focused: boolean
  moving: boolean
  locationStrategy: "topLeft" | "centroid" | "mouse",
};

interface pos { x: number, y: number };

export class AccessibleDragee extends React.PureComponent<AccessibleDrageeProps, {}> {
  rect: { top: number, height: number, left: number, width: number }
  ref: HTMLDivElement
  oldHeight: number

  fastMove = (loc: {centroid: pos, topLeft: pos, mouse: pos}, monitor: any) => {
    const y = loc[this.props.locationStrategy].y
    if (y < this.rect.top + this.rect.height) {
      fastMove(this.ref, { x: 0, y: 104 });
      if (y > this.rect.top) {
        monitor.updates = {order: this.props.previousOrder};
      }
    } else {
      fastMove(this.ref, { x: 0, y: 0 });
    }
  }

  startDrag = () => {
    this.setRect();
    setTimeout(() => this.ref.style.transition = 'transform .125s');
  }

  stopDrag = () => {
    this.ref.style.transform = 'none';
    this.ref.style.transition = 'none';
  }

  setRect() {
    if (!this.ref) return;
    const rect = this.ref.getBoundingClientRect();
    this.rect = {
      height: rect.height,
      top: rect.top + document.getElementById("scroller").scrollTop,
      left: rect.left + document.getElementById("scroller").scrollLeft,
      width: rect.width
    }
  }

  setRef = (r: HTMLDivElement) => {
    this.ref = r;
  }

  dropUpdate = (monitor: any) => {
    Object.assign(this.props.item, monitor.updates);
  }

  render() {
    return (
       <DragActor
          contextName={"demo"}
          id={this.props.item.text}
          setRef={this.setRef}
          dragStart={this.startDrag}
          fastUpdate={this.fastMove}
          dragStop={this.stopDrag}>
          <Draggable contextName="demo" monitor={{order: this.props.item.order}} onDrop={this.dropUpdate} touchStrategy={"waitForTime"} mouseStrategy={"instant"}>
            <Link focused={this.props.focused} to="ima-link" css={css([style.item, this.props.moving && style.moving])}>{this.props.item.text}</Link>
          </Draggable>
        </DragActor>
    );
  }
}

const style = styles({
  item: {
    fontSize: 20,
    width: 300,
    height: 100,
    padding: 20,
    margin: '4px 0',
    backgroundColor: "#fff",
    boxShadow: vars.shadow.boxShadow,
    cursor: 'pointer',
    display: 'block',
    textDecoration: 'none',
    transition: 'box-shadow 125ms',
    ':focus': {
      outline: 'none',
      boxShadow: vars.shadow.deepShadow,
      textShadow: 'none'
    },
    ':hover': {
      boxShadow: vars.shadow.deepShadow,
      zIndex: 1
    }
  },
  moving: {
    opacity: 0.5,
    border: "1px dashed #ddd",
    boxShadow: "none",
    ':focus': {
      boxShadow: 'none'
    },
  }
})