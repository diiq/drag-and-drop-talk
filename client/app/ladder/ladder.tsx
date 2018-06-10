import * as React from 'react';
import { Color } from 'models';
import { Swatch } from 'swatch/swatch';
import { styles } from 'styles/css';

export interface LadderProps {
  colors: Color[],
  clip?: boolean
};

export class Ladder extends React.Component<LadderProps, {}> {
  render() {
    var colors = this.props.colors;
    if (this.props.clip) {
      colors = colors.map(c => c.unclip());
    }
    return <div {...style.container}>
      {colors.map((c, i) => {
          return <Swatch color={c} key={i} showClipped />
      })}
    </div>;
  }
}

let style = styles({
  container: {
    flex: 1,
    minHeight: 110,
    display: "grid",
    gridTemplateColumns: `repeat(auto-fit, minmax(50px, 1fr))`,
    gridTemplateRows: "auto",
    gridGap: 5,
    '@media(max-width: 800px)': {
      gridGap: 2
    }
  },
});
