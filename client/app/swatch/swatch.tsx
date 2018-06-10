import * as React from 'react';
import { Color } from 'models';
// CSS
import { styles, vars } from 'styles/css';
import { Link } from 'link/link';
import { Draggable } from 'drag-drop/draggable';
import { DragActor } from 'drag-drop/drag-actor';
const uuid = require('uuid/v4') as () => string;

export interface SwatchProps {
  color: Color
  showClipped?: boolean
  monitorData?: {}
};

export class Swatch extends React.PureComponent<SwatchProps, {}> {
  static defaultProps = {
    monitorData: {}
  }
  id: string
  r: HTMLDivElement

  componentWillMount() {
    this.id = uuid();
  }

  dragRenderer = () => {
    const color = this.props.color;
    const contrast = color.contrast();
    return <div {...style.draggable} style={{backgroundColor: color.hex, color: contrast.hex}}>
      <div {...style.name}>{color.name}</div>
    </div>
  }

  onDrop = () => {
    this.r.style.opacity = "";
  }

  onDragStart = (monitor: {color: Color}) => {
    if (monitor.color.name == this.props.color.name) {
      this.r.style.opacity = "0.5";
    }
  }

  setRef = (r: HTMLDivElement) => {
    this.r = r;
  }

  render() {
    const color = this.props.color;
    const contrast = color.contrast();
    if (this.props.showClipped)
      var transContrast = contrast.color.alpha(.3).css();
    return (
      <div ref={this.setRef} {...style.swatch} style={{backgroundColor: color.hex, color: contrast.hex}} {...(color.clipped && !this.props.showClipped && style.clippedHidden)}>
        <Link to={`/colors/${color.lch[0]}/${color.lch[1]}/${color.lch[2]}`} replacementCSS={style.link} >
          <div {...style.name}>{color.name}</div>
          {color.clipped && this.props.showClipped && <div {...style.clippedCover} style={{borderTopColor: transContrast, borderRightColor: transContrast}}></div>}
          <DragActor contextName="swatches" id={this.id} dragStart={this.onDragStart} dragStop={this.onDrop} />
          <Draggable css={style.swatchSize} dragRender={this.dragRenderer} contextName="swatches" monitor={{color: color, ...this.props.monitorData}} onDrop={this.onDrop}>

          </Draggable>
        </Link>
      </div>
    );
  }
}


let style = styles({
  draggable: {
    width: "9vmin",
    height: "9vmin",
    borderRadius: 2,
    boxShadow: vars.shadow.deepShadow,
    '@media(max-width: 600px)': {
      color: 'transparent !important'
    },
  },
  swatchSize: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  name: {
    position: 'absolute',
    right: 7,
    bottom: 5,
    fontSize: 10,
    '@media(max-width: 800px)': {
      right: 3,
      bottom: 2
    },
  },
  link: {
    width: '100%',
    height: '100%',
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    position: 'relative',
    WebkitUserDrag: 'none',
  },
  swatch: {
    boxShadow: vars.shadow.boxShadow,
    borderRadius: 2,
    overflow: "hidden",
    transition: "box-shadow 250ms",
    '@media(max-width: 600px)': {
      color: 'transparent !important'
    },
    ':hover': {
      boxShadow: vars.shadow.deepShadow,
    }
  },
  clippedHidden: {
    boxShadow: 'none',
    opacity: 0.1,
    color: "transparent",
    pointerEvents: "none"
  },
  clippedCover: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderStyle: "solid",
    borderWidth: 10,
    borderColor: "transparent",
  }
});
