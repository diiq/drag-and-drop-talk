import * as React from 'react';
import { Color } from 'models';
import { styles } from 'styles/css';
import { Button } from 'button/button';

export interface HueSelectorProps {
  currentHue?: number,
  lightness?: number,
  chroma?: number,
  clip?: boolean,
  action(hue:number): void
};

export class HueSelector extends React.Component<HueSelectorProps, {}> {
  static defaultProps = {
    lightness: 60,
    chroma: 60,
    clip: true
  }

  state = {
    colors: [] as Color[]
  }

  setup(props: HueSelectorProps) {
    var bow = Color.fetchRainbow(props.lightness, props.chroma);
    if (this.props.clip) {
      bow = bow.map(c => c.unclip());
    }
    this.setState({colors: bow});
  }

  componentWillMount() {
    this.setup(this.props);
  }

  componentWillReceiveProps(props: HueSelectorProps) {
    this.setup(props);
  }

  render() {
    return <div {...style.ladder}>{this.state.colors.map(c => {
      return <Button action={()=>this.props.action(Math.round(c.lch[2]))} replacementCss={[{backgroundColor:c.hex}, c.clipped && { opacity: 0.2 }]} key={c.id}></Button>
    })}</div>
  }
}

let style = styles({
  ladder: {
    flex: 1,
    display: "grid",
    gridTemplateColumns: `repeat(36, 1fr)`,
    gridTemplateRows: "1fr",
    gridGap: 0,
    minHeight: 30,
    height: '100%'
  }
});
