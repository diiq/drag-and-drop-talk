import * as React from 'react';
import { ActionContextService } from 'focus';
const dashify = require('dashify') as (s: string) => string;
import { func } from 'prop-types';

// Components
import { Labelled } from 'forms/labelled/labelled';

// CSS
import { styles, vars, css } from 'styles/css';


export interface CheckBoxProps {
  onChange(v: string): void
  label: string
  autofocus?: boolean
  errors?: string[]
  inputRef?: (ref: HTMLInputElement) => void
  note?: string
  placeholder?: string
  required?: boolean
  type?: string
  value?: boolean
  disabled?: boolean
  id: string
};

export class CheckBox extends React.Component<CheckBoxProps, {}> {
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
    const { label, note, errors, value, required, placeholder, disabled, id } = this.props
    return (
      <label {...style.bigLabel}>
        <input {...css(style.input, errors && style.errorInput) }
          className={dashify(this.props.label)} // For testing purposes
          ref={r => {
            this.input = r;
            if (this.props.inputRef) {
              this.props.inputRef(r);
            }
          }}
          placeholder={placeholder}
          onFocus={this.onFocus}
          aria-invalid={!!errors}
          aria-required={required}
          type="checkbox"
          checked={value}
          disabled={disabled}
          onClick={e => e.stopPropagation()}
          id={id}
          onChange={(e: any) => { this.props.onChange(e.target.checked); }} />
        <Labelled htmlFor={this.props.id} flex={true} {...{ errors, label, note, required }}>

        </Labelled>
      </label>
    );
  }
}

let style = styles({
  bigLabel: {
    display: 'flex'
  },
  errorInput: {
    borderColor: vars.color.warn
  },
  input: {
    marginRight: 4
  },
  icon: {
    position: 'absolute',
    right: vars.smallSpacing,
    bottom: vars.smallSpacing - 2
  }
});
