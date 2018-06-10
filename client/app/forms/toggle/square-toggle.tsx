import * as React from 'react';
//import { pointerCoord } from './util'
import { ActionContextService, Action } from 'focus';
import { styles, vars, Style } from 'styles/css';
import { Focusable } from 'focus';

export interface SquareToggleProps {
  onChange: (value: boolean) => void
  value: boolean
  disabled?: boolean
  css?: Style
  label: string
  'aria-labelledby'?: string
  'aria-label'?: string
};

ActionContextService.addContext("square-oggle", {
  hidden: true,
  name: "Toggle",
  documentation: "Toggles between options.",
  actions: {
    read: new Action({
      name: "Toggle",
      shortDocumentation: "Swap this option",
      searchTerms: [],
      actOn: (c: SquareToggle) => {
        c.onChange();
      },
      defaultKeys: ["Space"]
    })
  }
});

export class SquareToggle extends React.Component<SquareToggleProps, {}> {
  handleFocus() {
    this.setState({ hasFocus: true })
  }

  handleBlur() {
    this.setState({ hasFocus: false })
  }

  componentWillReceiveProps(newProps: SquareToggleProps) {
    this.setState({ checked: newProps.value });
  }

  onChange = () => {
    this.props.onChange(!this.props.value)
  }

  render() {
    return (
      <Focusable
        trigger={this.onChange}
        tabIndex={0}
        role="toggle"
        context="square-toggle"
        contextComponent={this}
        ariaLabel={`${this.props.label}: ${this.props.value ? 'on' : 'off'}`}
        css={[style.toggle, this.props.value && style.checked, this.props.css]}>
        {this.props.children}
      </Focusable>
    )
  }
}

const style = styles({
  toggle: {
    display: "inline-block",
    cursor: "pointer",
    backgroundColor: vars.color.theme,
    color: vars.color.white,
    fontWeight: 'bold',
    border: 0,
    padding: `${vars.spacing}px 0`,
    lineHeight: 0,
    userSelect: "none",
    width: vars.spacing * 2,
    height: vars.spacing * 2,
    textAlign: 'center',
    ':hover': {
      backgroundColor: vars.color.themeLight
    },
    '@media(max-width: 500px)': {
      padding: `${vars.spacing * .75}px 0`,
      width: vars.spacing * 1.5,
      height: vars.spacing * 1.5,
      fontSize: 14
    }
  },
  checked: {
    backgroundColor: vars.color.success,
    ':hover': {
      backgroundColor: vars.color.successLight
    }
  }
});
