
import * as React from 'react';
import { styles } from 'styles/css';

export interface ImageAndTextProps { image: string, text: JSX.Element, hacked?: boolean };

export class ImageAndText extends React.Component<ImageAndTextProps, {}> {
  render() {
    return (
      <div {...style.slide} {...(this.props.hacked && style.hacked)}>
        <img {...style.image} src={this.props.image} />
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
  image: {
    maxHeight: "100%",
    maxWidth: '100%',
    margin: '0 auto'
  },
  text: {
    fontSize: 30,
    marginLeft: 'auto',
    textAlign: 'right',
    maxWidth: '70%',
    '@media(max-width:600px)': {
      maxWidth: '90%'
    }
  }
})