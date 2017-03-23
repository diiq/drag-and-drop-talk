import * as React from 'react';
import { ActionJSON, ActionService, config } from 'action/action';
import { Thanks } from 'thanks/thanks.component';
import { Spinner } from 'spinner/spinner.component';
import { Waiting } from 'home/waiting/waiting.component';

//import * as style from './mic-check.scss';

export interface MicCheckProps { taskID: string };

export class MicCheck extends React.Component<MicCheckProps, {}> {
  state: {
    action?: ActionJSON
    connecting: boolean
  } = { connecting: false }

  time() {
    return (new Date()).getTime();
  }

  connect = () => {
    this.setState({ connecting: true });
    ActionService.create(this.props.taskID, this.time()).then(
      action => { this.setState({ action: action, connecting: false }) }
    )
  }

  render() {
    if (config.emoji) {
      return (
        <Waiting />
      );
    } else if (this.state.connecting) {
      return (
        <Spinner />
      );
    } else {
      return <div className="two-choices">
        <button onClick={this.connect} className="button action" style={{ display: "block", borderRadius: "100px", width: "200px", height: "200px", margin: "50px auto" }}>Connect!</button>
      </div >
    }
  }
}
