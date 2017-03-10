import * as React from 'react';
import * as style from './spinner.scss';

export interface SpinnerProps { };

export class Spinner extends React.Component<SpinnerProps, {}> {
  render() {
    return <div className={style.uilEllipsisCss} style={{ transform: 'scale(0.49)' }}>
      <div className={style.ib}>
        <div className={style.circle}>
          <div></div>
        </div><div className={style.circle}>
          <div></div>
        </div>
        <div className={style.circle}>
          <div></div>
        </div>
        <div className={style.circle}>
          <div></div>
        </div>
      </div>
    </div>;
  }
}
