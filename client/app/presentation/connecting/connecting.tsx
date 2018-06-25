
import * as React from 'react';
import { styles } from 'styles/css';
import { Spinner } from 'spinner/spinner';
import { Button } from 'button/button';
import { TV } from 'presentation/tv/tv';
const sponsors = require("./sponsors.jpg");
const NoSleep = require('nosleep.js')

export interface ConnectingProps { text: JSX.Element | string, hackedText: JSX.Element };

export class Connecting extends React.Component<ConnectingProps, {}> {
  state = {
    state: "needTouch" as "needTouch" | "connecting" | "TV" | "hacked"
  }

  nosleep = () => {
    const noSleep = new NoSleep();
    noSleep.enable();
    this.setState({state: "connecting"})
    setTimeout(() => {
      this.setState({state: "TV"})
      setTimeout(() => {
        this.setState({state: "hacked"})
      }, 700)
    }, 2000)
  }

  render() {

    return (
      <div style={{height: "100%"}}>
        {this.state.state == "needTouch" && <div {...style.slide}>
          <Button action={this.nosleep} css={style.button}>Click Here to Connect</Button>
        </div>}

        {this.state.state == "connecting" && <div {...style.slide}>
          <h1 {...style.text}>{this.props.text}</h1>
          <Spinner />
          <img {...style.image} src={sponsors} />
        </div>}

        {this.state.state == "TV" && <TV />}

        {this.state.state == "hacked" && <div {...style.hacked}>
          <div>
            {this.props.hackedText}
          </div>
        </div>}
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