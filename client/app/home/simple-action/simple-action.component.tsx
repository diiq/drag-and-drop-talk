import * as React from 'react';
import { ActionJSON, ActionService } from 'action/action';
import { Thanks } from 'thanks/thanks.component';

export interface SimpleActionProps { taskID: string };

export class SimpleAction extends React.Component<SimpleActionProps, {}> {
  state: {
    action?: ActionJSON
    reallyDone: boolean
    done: boolean
    startTime: number
  } = { done: false, reallyDone: false, startTime: 0 }

  time() {
    return (new Date()).getTime() - this.state.startTime;
  }

  componentWillMount() {
    this.setState({
      startTime: (new Date()).getTime()
    })
  }

  componentWillReceiveProps(props: SimpleActionProps) {
    if (props.taskID !== this.props.taskID) {
      this.setState({
        action: null,
        done: false,
        startTime: (new Date()).getTime()
      })
    }
  }

  done = () => {
    this.setState({ done: true })
  }

  notDone = () => {
    this.setState({ done: true })
  }

  reallyDone = () => {
    ActionService.create(this.props.taskID, this.time()).then(
      action => { this.setState({ action: action, reallyDone: true }); }
    )
  }

  render() {
    if (this.state.reallyDone) {
      return (
        <div>
          <Thanks />
        </div>
      );
    } else if (this.state.done) {
      return (
        <div className="two-choices">
          <button className="button action" onClick={this.reallyDone}>{"Yep, I really did it!"}</button>
          <button className="button" onClick={this.notDone}>{"Wait, not yet."}</button>
        </div>
      );
    } else {
      return (
        <div className="two-choices">
          <button className="button action" onClick={this.done}>{"Done!"}</button>
        </div>
      );
    }
  }
}
