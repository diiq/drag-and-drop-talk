import * as React from 'react';
import { ActionJSON, ActionService } from 'action/action';
import { Thanks } from 'thanks/thanks.component';


export interface TypingActionProps { taskID: string };

export class TypingAction extends React.Component<TypingActionProps, {}> {
  state: {
    action?: ActionJSON
    done: boolean
    startTime: number
  } = { done: false, startTime: 0 }

  time() {
    return (new Date()).getTime() - this.state.startTime;
  }

  componentWillMount() {
    this.setState({
      startTime: (new Date()).getTime()
    })
  }

  componentWillReceiveProps(props: TypingActionProps) {
    if (props.taskID !== this.props.taskID) {
      this.setState({
        action: null,
        done: false,
        startTime: (new Date()).getTime()
      })
    }
  }

  done = () => {
    ActionService.create(this.props.taskID, this.time()).then(
      action => { this.setState({ action: action, done: true }); }
    )
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
        <div style={{ padding: "10px" }}>
          <label>Type here:
          <textarea style={{ height: "50vh" }} />
          </label>
          <button className="button action" onClick={this.done}>{"Done!"}</button>
        </div>
      );
    }
  }
}
