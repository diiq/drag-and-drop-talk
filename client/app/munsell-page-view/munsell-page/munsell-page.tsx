import * as React from 'react';
import { Color } from 'models';
import { Swatch } from 'swatch/swatch';
import { styles } from 'styles/css';

export interface MunsellPageProps {
  hue: number
};

export class MunsellPage extends React.PureComponent<MunsellPageProps, {}> {
  state = {
    colors: [] as Color[]
  }

  componentWillMount() {
    this.setState({colors: Color.fetchHuePage(this.props.hue)});
  }

  render() {
    return <div {...style.container}>
      {this.state.colors.map((c, i) => <Swatch color={c} key={i} />)}
    </div>;
  }
}

let style = styles({
  container: {
    margin: "5px auto",
    padding: "0 5px",
    height: `calc(100vmin - 45px)`,
    display: "grid",
    gridTemplateColumns: `repeat(11, 1fr) .5fr`,
    gridTemplateRows: ".5fr repeat(9, 1fr) .5fr",
    gridGap: 5,
    '@media(max-width: 800px)': {
      gridGap: 2
    }
  },
});
