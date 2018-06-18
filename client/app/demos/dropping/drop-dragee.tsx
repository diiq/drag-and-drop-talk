
import * as React from 'react';
import { styles } from 'styles/css';
import { Draggable } from 'drag-drop/draggable';
import { vars } from 'styles/css';
import { Link } from 'link/link';

export interface DropDrageeProps {
  text: string,
  locationStrategy: "top-left" | "centroid" | "mouse",
};

export class DropDragee extends React.PureComponent<DropDrageeProps, {}> {
  render() {
    return (
      <div {...style.gap}>
        <Draggable contextName="demo" monitor={{}} onDrop={() => {}} touchStrategy={"waitForTime"} mouseStrategy={"instant"}>
          <Link to="ima-link" css={style.item}>{this.props.text}</Link>
        </Draggable>
      </div>
    );
  }
}

const style = styles({
  gap: {
    width: 300,
    height: 100,
    margin: 4,
  },
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
  }
})