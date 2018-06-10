import * as React from 'react';
import { ActionJSON, ActionService } from 'action/action';
import { Thanks } from 'thanks/thanks.component';

export interface CensusProps { taskID: string };

export class Census extends React.Component<CensusProps, {}> {
  state: {
    action?: ActionJSON
    done: boolean
  } = { done: false }

  time() {
    return (new Date()).getTime()
  }

  componentWillReceiveProps(props: CensusProps) {
    if (props.taskID !== this.props.taskID) {
      this.setState({ action: null, done: false });
    }
  }

  yes = () => {
    ActionService.create(this.props.taskID, this.time()).then(
      action => { this.setState({ action: action, done: true }); }
    )
  }

  no = () => {
    this.setState({ done: true });
  }

  render() {
    if (this.state.done) {
      return (
        <div>
          <Thanks />
        </div>
      );
    } else {
      return (
        <div className="two-choices">
          <button className="button action" onClick={this.yes}>{"That's me!"}</button>
          <button className="button" onClick={this.no}>{"No, not I."}</button>
        </div>
      );
    }
  }
}
