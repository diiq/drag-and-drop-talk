declare const RELEASE: string;

import * as React from 'react';
import { Link } from 'link/link';
// CSS
import { styles, vars } from 'styles/css';

export function Footer() {
  return (
    <footer {...style.footer}>
      Pigmentor is a personal design tool of Sam Bleckley's. If you have comments or questions, contact <Link to="mailto:sam@climatum.com">sam@climatum.com</Link>.
      <br />Release number {RELEASE}
    </footer>
  );
}

let style = styles({
  footer: {
    fontSize: 16,
    backgroundColor: vars.color.theme,
    minHeight: 120,
    textAlign: 'center',
    padding: vars.spacing,
    color: vars.color.themeLight,
    ' a': {
      color: vars.color.themeLight,
      textDecoration: 'none',
      ':hover': {
        color: vars.color.white,
      }
    }
  }
});