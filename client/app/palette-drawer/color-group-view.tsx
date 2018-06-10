import * as React from 'react';
import { styles } from 'styles/css';
import { Button } from 'button/button';
import { DragActor } from 'drag-drop/drag-actor';
import { Color } from 'models';
import { Swatch } from 'swatch/swatch';
import { DragPosition } from 'drag-drop/drag-context';
import { ColorGroup } from 'models';
import { observer } from 'mobx-react';

export interface ColorGroupViewProps {
  group: ColorGroup,
  remove(): void
};

@observer
export class ColorGroupView extends React.Component<ColorGroupViewProps, {}> {
  ref: HTMLDivElement

  componentWillMount() {
    this.setState({colorGroup: new ColorGroup("Colors")})
  }

  insideGroup(x: number, y: number) {
    const box = this.ref.getBoundingClientRect()
    return x < box.right && x > box.left && y < box.bottom && y > box.top;
  }

  drop = (monitor: {color: Color, group: ColorGroup, index: number}, position: DragPosition) => {
    const intoGroup = this.insideGroup(position.mouseX, position.mouseY)
    if (monitor.group == this.props.group && !intoGroup) {
      this.props.group.removeColor(monitor.color)
    }
    if (monitor.group != this.props.group && intoGroup) {
      this.props.group.addColor(monitor.color, this.props.group.colors.length)
    }
  }

  setRef = (r: HTMLDivElement) => {
    this.ref = r;
  }

  render() {
    const group = this.props.group;
    return <div {...style.flexy} ref={this.setRef}>
      <DragActor contextName="swatches" id={`color-group-${group.id}`} dragStop={this.drop}>
        <h4>{group.name} <Button theme="warn" css={{float: "right", padding: 0, lineHeight: 0, paddingTop: 8, borderRadius: 10, width: 17, height:17, fontWeight: 'normal'}} action={this.props.remove}>&times;</Button></h4>
        <div {...style.grid}>
          {group.colors.map((c, i) => <Swatch color={c} key={i} showClipped monitorData={{group: group, index: i, fromPalette: true}}/>)}
        </div>
      </DragActor>
    </div>
  }
}

let style = styles({
  flexy: {
    paddingBottom: 5,
    flexGrow: 1,
    ' h4': {
      padding: "5px 5px 5px 10px",
      margin: 0,
      backgroundColor: "#f5f5f5",
      borderTop: "1px solid #ddd"
    }
  },
  grid: {
    padding: "5px 10px 5px 10px",
    minHeight: 80,
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gridAutoRows: "80px",
    gridGap: 5,
    '@media(max-width: 600px)': {
      gridGap: 2,
      gridTemplateColumns: "repeat(5, 1fr)",
      gridAutoRows: "50px",
      minHeight: 50,
    }
  }
});
