import * as React from 'react';
import { observer } from 'mobx-react';
import { Action, ActionContextService } from 'focus';
import { go, isActive, history, whereTo } from 'router';
import { css, styles, vars, Style } from 'styles/css';
import { buttonStyle } from 'button/button';
import { func } from 'prop-types';
import { ConstrainFocusService } from 'focus';

export interface LinkProps {
  to: string
  mouseOverFocus?: boolean
  query?: { [id: string]: string }
  state?: any
  theme?: string
  flex?: boolean
  square?: boolean
  css?: Style
  replacementCSS?: Style
  activeCSS?: Style
  replace?: boolean
  autofocus?: boolean
  focused?: boolean
  tabIndex?: number
  stealFocus?: () => void
  role?: string
  beforeGo?: () => void
  target?: string
  title?: string
};

ActionContextService.addContext("link", {
  hidden: true,
  actions: {
    submit: new Action({
      name: "Go",
      shortDocumentation: "",
      searchTerms: [],
      hidden: true,
      defaultKeys: ["Enter"],
      actOn: (c: Link) => c.go()
    }),
  },
});

@observer
export class Link extends React.Component<LinkProps, {}> {
  static contextTypes = {
    setActionContext: func,
  }
  state: { active: false }
  link: HTMLAnchorElement
  newFocus = false
  unlisten: () => void;

  constructor(props: LinkProps, context: any) {
    super(props, context);
    if (this.props.activeCSS) {
      const updateActive = () => {
        this.setState({
          active: isActive(this.props.to, {
            query: this.props.query,
            state: this.props.state
          })
        });
      }
      this.unlisten = history.listen(updateActive);
    }
  }

  componentDidMount() {
    if (this.props.focused || this.props.autofocus) {
      this.link.focus();
    }
  }

  componentWillReceiveProps(props: LinkProps) {
    if (!this.props.focused && props.focused) {
      this.newFocus = true;
    }
  }

  componentDidUpdate() {
    if (this.newFocus) {
      this.newFocus = false;
      if (ConstrainFocusService.focusable(this.link)) {
        this.link.focus();
        this.focus();
      }
    }
  }

  componentWillUnmount() {
    if (this.unlisten) this.unlisten();
  }

  focus = () => {
    if (this.props.stealFocus && !this.props.focused) {
      this.props.stealFocus();
    } else {
      this.setContext();
    }
  }

  setContext() {
    ActionContextService.newContext();
    ActionContextService.pushNewContext("link", this);
    this.context.setActionContext();
  }

  go() {
    if (this.props.beforeGo && this.props.beforeGo()) return;
    go(this.props.to, {
      query: this.props.query,
      state: this.props.state
    }, this.props.replace);
  }

  active() {
    return isActive(this.props.to, {
      query: this.props.query,
      state: this.props.state
    });
  }

  remoteLink() {
    return this.props.to.match(/\:/);
  }

  onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (this.remoteLink()) return;
    if (e.ctrlKey || e.shiftKey || e.altKey || e.metaKey) return;
    e.preventDefault();
    this.go();
  }

  render() {
    return <a
      ref={r => this.link = r}
      {...css(this.props.flex && { flex: 1 },
        style.reset,
        !this.props.replacementCSS && [!this.props.theme && style.link,
        this.props.theme && buttonStyle(this.props.theme, this.props.mouseOverFocus),
        this.props.square && { borderRadius: 0 }],
        this.props.css,
        this.props.replacementCSS,
        this.active() && this.props.activeCSS) }
      tabIndex={this.props.tabIndex || 0}
      onFocus={this.focus}
      onClick={this.onClick}
      onMouseOver={e => {
        if (this.props.mouseOverFocus) {
          e.stopPropagation();
          this.link.focus();
        }
      }}
      target={this.props.target}
      role={this.props.role}
      href={whereTo(this.props.to).pathname}
      title={this.props.title}>
      {this.props.children}
    </a>;
  }
}

let style = styles({
  reset: {
    display: 'block',
    color: 'inherit',
    textDecoration: 'inherit',
    ...vars.focus
  },
  link: {
    display: 'inline',
    color: vars.color.themeLight,
    textDecoration: 'underline',
    ':hover': {
      color: vars.color.theme,
    },
    ':focus': {
      boxShadow: 'none',
      textShadow: `0 0 10px ${vars.color.focus}, 0 0 15px ${vars.color.focus}`
    }
  }
});
