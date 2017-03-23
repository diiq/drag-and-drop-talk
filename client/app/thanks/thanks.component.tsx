import * as React from 'react';
import * as style from './thanks.scss';

export interface ThanksProps { };

export class Thanks extends React.Component<ThanksProps, {}> {
  render() {
    return <h1 className={style.thanks}>Thanks!</h1>;
  }
}
