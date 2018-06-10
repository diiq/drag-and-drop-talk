
import * as React from 'react';
import { styles } from 'styles/css';

export interface TitleAndBigTextProps { title: JSX.Element, text: JSX.Element };

export class TitleAndBigText extends React.Component<TitleAndBigTextProps, {}> {
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
    justifyContent: 'center'
  },
  title: {
    fontSize: 80,
  },
  text: {
    fontSize: 50,
    marginTop: 50,
    marginLeft: 'auto',
    textAlign: 'right',
    maxWidth: '70%'
  }
})