import * as React from 'react';
import { Action, ActionContextService, pass } from 'focus';
const dashify = require('dashify') as (s: string) => string;
import { func } from 'prop-types';

// Components
import { Labelled } from 'forms/labelled/labelled';

// CSS
import { styles, vars, css } from 'styles/css';

ActionContextService.addContext("short-input", {
  hidden: true,
  actions: {
    submit: new Action({
      name: "submit",
      shortDocumentation: "",
      searchTerms: [],
      hidden: true,
      defaultKeys: ["Enter"],
      actOn: pass("submit")
    }),
    cancel: new Action({
      name: "cancel",
      shortDocumentation: "",
      searchTerms: [],
      hidden: true,
      defaultKeys: ["Escape"],
      actOn: pass("cancel")
    }),
  },
  opaque: true
});

export interface ShortInputProps {
  onChange(v: string): void
  label: string
  autofocus?: boolean
  errors?: string[]
  flex?: boolean
  inputRef?: (ref: HTMLInputElement) => void
  note?: string
  placeholder?: string
  autocomplete?: string
  required?: boolean
  type?: string
  value?: string
  unit?: string
  min?: number
};

export class ShortInput extends React.Component<ShortInputProps, {}> {
  static contextTypes = {
    setActionContext: func,
    actionInContext: func
  }
  input: HTMLInputElement

  componentDidMount() {
    if (this.props.autofocus) this.focus();
  }

  focus() {
    this.input.focus();
  }

  onFocus = () => {
    ActionContextService.newContext();
    ActionContextService.pushNewContext("short-input", this);
    this.context.setActionContext();
  }

  render() {
    const { label, note, type, errors, value, required, flex } = this.props
    return (
      <Labelled {...{ errors, label, note, required, flex }}>
        {this.props.children}
        <input {...css(style.input, errors && style.errorInput) }
          className={dashify(this.props.label)} // For testing purposes
          ref={r => {
            this.input = r;
            if (this.props.inputRef) {
              this.props.inputRef(r);
            }
          }}
          min={this.props.min}
          placeholder={this.props.placeholder}
          onFocus={this.onFocus}
          aria-invalid={!!errors}
          aria-required={required}
          autoComplete={this.props.autocomplete}
          type={type}
          value={value}
          onClick={e => e.stopPropagation()}
          onChange={(e: any) => this.props.onChange(e.target.value)} />
        <span>{this.props.unit}</span>
      </Labelled>
    );
  }
}

let style = styles({

  errorInput: {
    borderColor: `${vars.color.warn} !important`
  },
  input: {
    width: '100%',
    display: 'inline',
    padding: vars.smallSpacing - 1,
    marginTop: vars.smallSpacing / 2 - 2,
    marginBottom: vars.smallSpacing / 2,
    fontSize: 16,
    ...vars.border,
    boxShadow: vars.shadow.insetBoxShadow,
    ...vars.inputFocus,
    '::-webkit-input-placeholder': {
      color: "#ddd"
    }
  },
  icon: {
    position: 'absolute',
    right: vars.smallSpacing,
    bottom: vars.smallSpacing - 2
  }
});
