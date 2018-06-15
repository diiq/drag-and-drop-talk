import * as React from 'react';
import { styles } from 'styles/css';

export interface JustTextProps { text: JSX.Element };

export class JustText extends React.Component<JustTextProps, {}> {
  render() {
    return <div {...style.slide}>
      <div {...style.text}>{this.props.text}</div>
    </div>;
  }
}


const style = styles({
  slide: {
    margin: '0 auto',
    maxWidth: 1200,
    padding: 80,
    height: '100%',
    '@media(max-width:600px)': {
      padding: 40
    }
  },
  text: {
    fontSize: 40,
    marginLeft: 'auto',
  }
})