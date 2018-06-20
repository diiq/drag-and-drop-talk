
import * as React from 'react';
import { styles } from 'styles/css';

export interface TitleAndTextProps { title: JSX.Element, text: JSX.Element };

export class TitleAndText extends React.Component<TitleAndTextProps, {}> {
  render() {
    return (
      <div {...style.slide}>
        <h1 {...style.title}>{this.props.title}</h1>
        <div {...style.text}>
          {this.props.text}
        </div>
      </div>
    );
  }
}

const style = styles({
  slide: {
    margin: '0 auto',
    maxWidth: 1200,
    padding: 80,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    '@media(max-width:600px)': {
      padding: 40
    }
  },
  title: {
    fontSize: 80,
    '@media(max-width:600px)': {
      fontSize: 60
    }
  },
  text: {
    fontSize: 36,
    marginLeft: 'auto',
    textAlign: 'right',
    maxWidth: '70%',
    '@media(max-width:800px)': {
      maxWidth: '100%',
      fontSize: 24,
    },
    '@media(max-width:600px)': {
      maxWidth: '100%',
      fontSize: 20,
    }
  }
})