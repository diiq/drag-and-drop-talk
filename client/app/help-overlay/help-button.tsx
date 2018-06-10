import * as React from 'react';
import { pass } from 'focus';
import { func } from 'prop-types';

// CSS
import { styles, vars, css, Style } from 'styles/css';
import { buttonStyle } from 'button/button';
import { ActionButton } from 'action-button/action-button';

// Help is a strange case, because we want to provide help fo the item tath
// *was* in focus up until the help button was pressed; we *don't* want to
// provide help for the help button :)
export interface HelpButtonProps {
  css?: Style,
  replacementCss?: Style
  theme?: string
};

export class HelpButton extends React.Component<HelpButtonProps, {}> {
  static contextTypes = {
    actionInContext: func,
    setActionContext: func
  }

  wasFocused: HTMLElement

  handler = () => {
    this.wasFocused = document.activeElement as HTMLElement
  }

  componentDidMount() {
    window.addEventListener('focusin', this.handler)
  }

  componentWillUnmount() {
    window.removeEventListener('focusin', this.handler)
  }

  onClick() {
    if (this.wasFocused) {
      this.wasFocused.focus();
    } else {
      this.context.setActionContext();
    }
    pass("help")(this);
  }

  render() {
    return (
      <div aria-label="Help (control plus question-mark)" title="Help (Ctrl+?)"
        role="button"
        //tabIndex={0}
        //onFocus={e => this.onFocus(e)}
        onClick={() => this.onClick()}
        {...css(this.props.css,
          !this.props.replacementCss && !this.props.theme && style.button,
          this.props.theme && buttonStyle(this.props.theme, false),
          this.props.replacementCss) }>
        ?
      </div>
    );
  }
}

export class FocusableHelpButton extends React.Component<HelpButtonProps, {}> {
  render() {
    return (
      <ActionButton action="help"
        replacementCss={[this.props.css,
        !this.props.replacementCss && !this.props.theme && style.button,
        this.props.theme && buttonStyle(this.props.theme, false),
        this.props.replacementCss]}>
        ?
      </ActionButton>
    );
  }
}

let size = 30;
let style = styles({
  button: {
    display: 'inline-block',
    textAlign: 'center',
    backgroundColor: vars.color.theme,
    borderRadius: size / 2,
    fontWeight: 'bold',
    width: size,
    height: size,
    color: '#fff',
    cursor: 'pointer',
    userSelect: 'none',
    lineHeight: 0,
    padding: `${size / 2}px 0`,
    ':hover': {
      backgroundColor: vars.color.themeLight,
    },
    ':focus': {
      ...vars.focus[':focus'],
      backgroundColor: vars.color.themeLight,
    }
  }
})
