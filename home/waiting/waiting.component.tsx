import * as React from 'react';
import { Emojlet } from 'emojlet/emojlet.component';

//import * as style from './waiting.scss';

export interface WaitingProps { };

export class Waiting extends React.Component<WaitingProps, {}> {
  render() {
    return (<div className="waiting">
      <h1><strong>Connected!</strong></h1>
      <p>You are</p>
      <Emojlet />
      <p>Nothing for you to do right now. Relax and wait for further instructions!</p>
    </div>
    );
  }
}
