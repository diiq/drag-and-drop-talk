import * as React from 'react';

// CSS
import { styles, vars, css, Style } from 'styles/css';


export interface LabelledProps {
  label: string
  info?: string
  errors?: string[]
  flex?: boolean
  required?: boolean
  note?: string
  htmlFor?: string
  css?: Style
};

export class Labelled extends React.Component<LabelledProps, {}> {
  render() {
    const { label, errors } = this.props
    return (
      <label {...css([style.label, this.props.flex && style.flex, this.props.css]) } htmlFor={this.props.htmlFor}>
        <span {...style.labelText}>{label}
          {this.props.required && <span {...style.required} role="presentation" aria-hidden="true">*</span>}
        </span>

        {errors && <div {...style.errors} className="errors">
          {errors.map((err, i) => <span key={i}>{!!i && "; "}{err}</span>)}
        </div>}

        {!errors && <div {...style.note}>
          {this.props.note}
        </div>}
        <div {...css({ clear: 'both' }) } />
        {this.props.children}
      </label>
    );
  }
}

let style = styles({
  label: {
    position: 'relative',
    display: 'block',
    marginBottom: vars.smallSpacing + 2,
  },
  flex: {
    flex: 1,
    marginLeft: vars.spacing,
    ':first-of-type': {
      marginLeft: 0
    },
    '@media(max-width: 400px)': {
      flexBasis: '100%',
      width: '100%',
      marginLeft: 0
    }
  },
  labelText: {
    fontWeight: 600,
  },
  errors: {
    color: vars.color.warn,
    fontSize: 14,
    float: 'right',
    lineHeight: 1.6
  },
  note: {
    color: vars.color.fontLight,
    fontSize: 14,
    float: 'right',
    lineHeight: 1.6
  },
  info: {
    float: 'right',
    color: vars.color.fontLight,
    marginLeft: 5
  },
  required: {
    color: vars.color.themeLight,
    paddingLeft: 1,
  },
});