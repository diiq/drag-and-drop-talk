import * as React from 'react';
import { Focusable } from 'focus';
import { vars, css, Style } from 'styles/css';
import { ActionEvent } from 'focus';

export interface AnyButtonProps {
  tabIndex?: number
  mouseOverFocus?: boolean
  css?: Style
  replacementCss?: Style
  autofocus?: boolean
  clickFocus?: boolean
  focused?: boolean
  stealFocus?: () => void
  ariaLabel?: string | null
  title?: string
  role?: string
  theme?: string
  flex?: boolean
  square?: boolean
  testName?: string
  disabled?: boolean
  leftIcon?: string
  rightIcon?: string
  // Aria hint if the button makes a popup menu.
  hasPopup?: boolean
}

export interface ButtonProps {
  action: (e: ActionEvent) => void
};

export class Button extends React.Component<ButtonProps & AnyButtonProps, {}> {
  static defaultProps = {
    mouseOverFocus: false,
    tabIndex: 0,
    ariaLabel: null as null,
    role: "button",
    theme: "theme"
  };
  focusable: Focusable

  focus() {
    this.focusable.refocus();
  }

  setFocusable = (r: Focusable) => {
    this.focusable = r;
  }

  render() {
    return (
      <Focusable css={css(this.props.replacementCss ||
        [buttonStyle(this.props.theme, this.props.mouseOverFocus, this.props.disabled),
        this.props.square && { borderRadius: 0 },
        this.props.flex && { flex: 1 },
        (this.props.leftIcon || this.props.rightIcon) && { paddingLeft: vars.smallSpacing + 16, paddingRight: vars.smallSpacing + 16 },
        this.props.css])}
        ref={this.setFocusable}
        title={this.props.title}
        trigger={this.props.action}
        tabIndex={this.props.tabIndex}
        mouseOverFocus={this.props.mouseOverFocus}
        ariaLabel={this.props.ariaLabel}
        role={this.props.role}
        focused={this.props.focused}
        stealFocus={this.props.stealFocus}
        clickFocus={this.props.clickFocus}
        disabled={this.props.disabled}
        testName={this.props.testName}
        hasPopup={this.props.hasPopup}
        autofocus={this.props.autofocus}>
        {this.props.leftIcon && <i className={`fa fa-${this.props.leftIcon}`} {...iconStyle } aria-hidden />}
        {this.props.rightIcon && <i className={`fa fa-${this.props.rightIcon}`} {...iconStyle } aria-hidden />}
        {this.props.children}
      </Focusable>
    );
  }
}

export function buttonStyle(theme: string, mouseOverFocus: boolean, disabled?: boolean) {
  if (theme === "link") return linkStyle;
  var fontColor: string;
  switch (theme) {
    case "white": fontColor = vars.color.fontLight; break;
    case "theme": fontColor = vars.color.whiteLight; break;
    default: fontColor = vars.color.white;
  }
  var backgroundColor = vars.color[theme];
  var hoverColor = vars.color[theme + 'Light'];
  if (disabled) {
    fontColor = vars.color.fontLight;
    backgroundColor = "#ddd";
    hoverColor = "#ddd";
  }

  // Only have a hover color if there are separate hover and focus states
  const hover = mouseOverFocus ? {} : {
    ':hover': {
      backgroundColor: hoverColor,
    }
  }

  return css({
    margin: 2,
    padding: vars.smallSpacing,
    display: 'inline-block',
    textAlign: 'center',
    backgroundColor: backgroundColor,
    color: fontColor,
    userSelect: 'none',
    textDecoration: 'none',
    cursor: 'pointer',
    ...hover,
    ':focus': {
      ...vars.focus[':focus'],
      backgroundColor: hoverColor,
    }
  });
}

const linkStyle = css({
  label: 'link-button-styling',
  display: 'inline-block',
  padding: 2, // You'll live to regret this, I think
  color: vars.color.themeLight,
  textDecoration: 'underline',
  cursor: 'pointer',

  ':hover': {
    color: vars.color.theme,
  },
  ':focus': {
    boxShadow: 'none',
    textShadow: `0 0 10px ${vars.color.focus}, 0 0 15px ${vars.color.focus}`
  }
});

const iconStyle = css({
  position: 'absolute',
  left: vars.smallSpacing,
  top: vars.smallSpacing + 1
})