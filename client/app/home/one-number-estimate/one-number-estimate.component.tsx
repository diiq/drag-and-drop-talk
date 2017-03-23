import * as React from 'react';
//import * as style from './one-number-estimate.scss';
import { EstimateJSON, EstimateService } from 'estimate/estimate';
export interface OneNumberEstimateProps { taskID: string };
import { Thanks } from 'thanks/thanks.component';

export class OneNumberEstimate extends React.Component<OneNumberEstimateProps, {}> {
  input: HTMLInputElement
  state = {
    done: false
  }

  done = () => {
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
          <p>How long do you think it will take you, in seconds?</p>
          <input style={{ padding: "12px 7.5px" }}
            type="number"
            ref={(r) => this.input = r} />
          <button onClick={this.done} className="button action">Done!</button>
        </div>
      );
    }
  }
}
