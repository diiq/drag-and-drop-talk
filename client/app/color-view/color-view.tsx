import * as React from 'react';
import { Color } from 'models';
import { styles } from 'styles/css';
import { MainContentWrapper } from 'main-content-wrapper/main-content-wrapper';
import { HueSelector } from 'hue-selector/hue-selector';
import { go } from 'router/utils';
import { SideLabelled } from 'side-labelled/side-labelled';
import { Ladder } from 'ladder/ladder';

export interface ColorViewProps {
  hue: string,
  lightness: string,
  chroma: string
};

export class ColorView extends React.Component<ColorViewProps, {}> {
  state = {
    color: null as Color
  }

  componentWillMount() {
    const {hue, lightness, chroma} = this.props;
    this.setState({color: new Color(Number(lightness), Number(chroma), Number(hue), 'lch')});
  }

  componentWillReceiveProps(props: ColorViewProps) {
    const {hue, lightness, chroma} = props;
    this.setState({color: new Color(Number(lightness), Number(chroma), Number(hue), 'lch')});
  }

  render() {
    const color = this.state.color;
    return <MainContentWrapper>
      <div {...style.swatch} style={{backgroundColor: color.hex, color: color.light ? color.withLightness(20).hex : color.withLightness(90).hex}}>
        {color.name} ({color.hex})
      </div>
      <SideLabelled label="Lightness">
        <Ladder colors={color.lightnessLadder()} />
        <Ladder colors={color.tempLadder()} />
      </SideLabelled>
      {!isNaN(color.hue) &&
        <SideLabelled label="Complements">
          <Ladder colors={color.complements()} />
          {Math.abs(color.lightness - 50) > 10 && <Ladder colors={color.lComplements()} />}
        </SideLabelled>}
      {!isNaN(color.hue) &&
        <SideLabelled label="Chroma">
          <Ladder colors={color.chromaLadder()} />
        </SideLabelled>}
      {!isNaN(color.hue) &&
        <SideLabelled label="Hue">
          <Ladder colors={color.hueLadder()} />
          <HueSelector action={hue => go(`/colors/${color.lightness}/${color.chroma}/${hue}`)} lightness={color.lightness} chroma={color.chroma} clip={false} />
        </SideLabelled>}
    </MainContentWrapper>;
  }
}

let style = styles({
  swatch: {
    height: "30vh",
    fontSize: 40,
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    padding: 30,
  },
});
