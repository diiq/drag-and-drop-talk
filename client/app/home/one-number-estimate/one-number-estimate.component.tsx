import * as React from 'react';
import { EstimateJSON, EstimateService } from 'estimate/estimate';
import { Thanks } from 'thanks/thanks.component';

export interface OneNumberEstimateProps { taskID: string };


export class OneNumberEstimate extends React.Component<OneNumberEstimateProps, {}> {
  input: HTMLInputElement
  state = {
    done: false
  }

  done = (e: any) => {
    e.preventDefault();
    const mode = parseFloat(this.input.value);
    EstimateService.create(this.props.taskID, mode, 0).then(
      estimate => { this.setState({ done: true }); }
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
        <div style={{ padding: "20px" }}>
          <form onSubmit={this.done}>
            <label>
              How long do you think it will take you, in seconds?
              <input style={{ padding: "12px 7.5px" }}
                type="number"
                ref={(r) => this.input = r} />
            </label>
            <button onClick={this.done} className="button action">Done!</button>
          </form>
        </div>
      );
    }
  }
}
