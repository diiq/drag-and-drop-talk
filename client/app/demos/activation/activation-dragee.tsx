
import * as React from 'react';
import { styles } from 'styles/css';
import { Draggable } from 'esdragon';
import { vars } from 'styles/css';
import { Link } from 'link/link';

export interface ActivationDrageeProps {
  text: string,
  touchStrategy: "waitForMotion" | "waitForTime" | "instant",
  mouseStrategy: "waitForMotion" | "waitForTime" | "instant"
};

export class ActivationDragee extends React.PureComponent<ActivationDrageeProps, {}> {
  render() {
    return (
      <div {...style.gap}>
        <Draggable contextName="demo" monitor={{}} onDrop={() => {}} touchStrategy={this.props.touchStrategy} mouseStrategy={this.props.mouseStrategy}>
          <Link to="ima-link" css={style.item}>{this.props.text}</Link>
        </Draggable>
      </div>
    );
  }
}

const style = styles({
  gap: {
    height: 100,
    margin: 4,
  },
  item: {
    fontSize: 20,
    width: 'calc(100vw - 40px)',
    maxWidth: 400,
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