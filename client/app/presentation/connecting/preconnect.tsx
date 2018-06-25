

import * as React from 'react';
import { styles } from 'styles/css';
const sponsors = require("./sponsors.jpg");

export interface PreconnectProps { text: JSX.Element | string, hackedText: JSX.Element };

export class Preconnect extends React.Component<PreconnectProps, {}> {
  state = {
    state: "needTouch" as "needTouch" | "connecting" | "TV" | "hacked"
  }

  render() {

    return (
      <div {...style.slide}>
        <h1 {...style.text}>{this.props.text}</h1>
        <img {...style.image} src={sponsors} />
      </div>
    );
  }
}

const style = styles({
  slide: {
    margin: '0 auto',
    maxWidth: 1200,
    padding: 40,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  image: {
    maxHeight: "70%",
    maxWidth: "100%",
    margin: '0 auto'
  },
  text: {
    fontSize: 30,
    textAlign: 'center'
  },
  button: {
    maxWidth: 300,
    margin: 'auto'
  },
  hacked: {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: '#000',
    color: "#0F0",
    fontFamily: "monospace",
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    padding: 80,
    height: '100%',
    textAlign: 'right',
    fontSize: 30,
    '@media(max-width:600px)': {
      padding: 40
    }
  }
})