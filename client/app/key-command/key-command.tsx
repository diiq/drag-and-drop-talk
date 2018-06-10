import { Action } from 'focus';
import { Hotkey } from 'focus';
import * as React from 'react';
import { styles } from 'styles/css';
import { observer } from 'mobx-react';


export interface KeyCommandProps {
  action: Action
};

@observer
export class KeyCommand extends React.Component<KeyCommandProps, {}> {
  action() {
    return this.props.action
  }

  keys() {
    return this.action().keys.filter(k => k !== "None").map(k => Hotkey.displayKey(k));
  }

  render() {
    return (
      <span>
        {this.keys().map((key, i) => {
          return <span key={i}>{!!i && " or "}<span {...style.key}>{key}</span></span>
        })}
      </span>
    );
  }
}

let style = styles({
  key: {
    label: 'key-command-styling',
    color: '#666',
    backgroundColor: "#fff",
    border: "3px outset #eee",
    borderRadius: 5,
    padding: 5,
    fontSize: 12,
    boxShadow: "1px 1px 1px rgba(0,0,0,.2)"
  }
});
