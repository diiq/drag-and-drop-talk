import * as React from 'react';
import { config } from 'action/action';
//require.context("../images/emoji/", true, /^.*/);
//require.context("../images/emoji/unicode/", true, /^.*/);

import * as style from './emojlet.scss';

export interface EmojletProps { url?: string };

export class Emojlet extends React.Component<EmojletProps, {}> {
  render() {
    const url = this.props.url || config.emoji;
    return <div className={style.emoji} style={{ backgroundImage: `url(img/app/images/emoji/${url})` }} ></div>
  }
}
