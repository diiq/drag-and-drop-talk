
import * as React from 'react';
import { styles } from 'styles/css';
import { Spinner } from 'spinner/spinner';
const sponsors = require("./sponsors.jpg");

export interface ConnectingProps { text: JSX.Element };

export class Connecting extends React.Component<ConnectingProps, {}> {
  render() {
    return (
      <div {...style.slide}>
        <h1 {...style.text}>{this.props.text}</h1>
        <Spinner />
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
  }
})