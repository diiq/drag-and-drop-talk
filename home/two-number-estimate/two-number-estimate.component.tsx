import * as React from 'react';
import { EstimateJSON, EstimateService } from 'estimate/estimate';
import { Thanks } from 'thanks/thanks.component';

//import * as style from './two-number-estimate.scss';

export interface TwoNumberEstimateProps { taskID: string };

export class TwoNumberEstimate extends React.Component<TwoNumberEstimateProps, {}> {
  modeInput: HTMLInputElement
  extremeInput: HTMLInputElement
  state = {
    done: false
  }

  done = () => {
    const mode = parseFloat(this.modeInput.value);
    const extreme = parseFloat(this.extremeInput.value);
    EstimateService.create(this.props.taskID, mode, extreme).then(
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
          <label>How long do you think it is most likely to take you, in seconds?
          <input style={{ padding: "12px 7.5px" }}
              type="number"
              ref={(r) => this.modeInput = r} />
          </label>
          <label>What about in the worst case? How many seconds?
          <input style={{ padding: "12px 7.5px" }}
              type="number"
              ref={(r) => this.extremeInput = r} />
          </label>
          <button onClick={this.done} className="button action">Done!</button>
        </div>
      );
    }
  }
}
