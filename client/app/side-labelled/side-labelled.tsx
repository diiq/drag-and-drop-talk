import * as React from 'react';
import { styles, vars } from 'styles/css';

export interface SideLabelledProps {
  label: string,
};

export class SideLabelled extends React.Component<SideLabelledProps, {}> {
  render() {
    return <div {...style.container}>
      <div {...style.label}><div>{this.props.label}</div></div>
      <div {...style.labelled}>{this.props.children}</div>
    </div>;
  }
}

let style = styles({
  container: {
    display: 'flex',
    margin: '5px 5px 5px 0',
  },
  labelled: {
    flex: 1,
    flexDirection: 'column',
    display: 'flex',
    '> *': {
      marginBottom: 5,
      ':last-of-type': {
        marginBottom: 0
      }
    }
  },
  label: {
    boxShadow: vars.shadow.boxShadow,
    marginRight: 5,
    width: 30,
    padding: 5,
    position: 'relative',
    backgroundColor: "#fff",
    fontWeight: 'bold',
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
    ' > div': {
      fontSize: 14,
      whiteSpace: 'nowrap',
      lineHeight: 0,
      transform: 'rotate(-90deg)',
      transformOrigin: "0 0",
      position: 'absolute',
      bottom: 10,
      left: 15,
    }
  }
});
