import * as React from 'react';
import { Button, AnyButtonProps } from 'button/button';
import { func } from 'prop-types';

export interface ActionButtonProps {
  action: string
};

export class ActionButton extends React.Component<AnyButtonProps & ActionButtonProps, {}> {
  static contextTypes = {
    actionInContext: func
  }
  button: Button

  action() {
    return this.context.actionInContext(this.props.action);
  }

  label() {
    const action = this.action().action;
    const key = action.keys[0];
    if (key) {
      return `${action.name} (${key})`;
    } else {
      return action.name;
    }
  }

  focus() {
    this.button.focus();
  }

  setButton = (r: Button) => {
    this.button = r;
  }

  render() {
    const action = this.action();

    return (
      <Button {...this.props}
        ref={this.setButton}
        testName={`action-${this.props.action}`}
        ariaLabel={this.label()}
        title={this.props.title || this.label()}
        {...this.props}
        action={() => action.act()}>
        {this.props.children || action.action.name}
      </Button>
    );
  }
}

