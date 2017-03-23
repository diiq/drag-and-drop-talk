import * as React from 'react';
import { EstimateService, EstimateJSON } from 'estimate/estimate';
import { ActionService, ActionJSON } from 'action/action';
import { SampledDistribution } from 'distributions/sampled-distribution';
import { EstimateAndOutcomeHistogram } from 'histograms/estimate-and-outcome-histogram/estimate-and-outcome-histogram.component';


//import * as style from './single-estimate-histogram.scss';

export interface SingleEstimateOutcomeProps { taskID: string, text: JSX.Element };

export class SingleEstimateOutcome extends React.Component<SingleEstimateOutcomeProps, {}> {
  state: {
    estimateDistribution: SampledDistribution,
    outcomeDistribution: SampledDistribution,
  } = {
    estimateDistribution: new SampledDistribution([1]),
    outcomeDistribution: new SampledDistribution([1]),
  }
  interval = 0

  componentWillMount() {
    EstimateService.list(this.props.taskID).then((estimates) => {
      const numbers = estimates.map(e => e.mode)
      const average = numbers.reduce((a, b) => a + b) / (numbers.length);
      this.setState({
        estimateDistribution: new SampledDistribution([average])
      })
    });

    this.interval = setInterval(() => {
      ActionService.list(this.props.taskID).then((actions) => {
        const numbers = actions.map(a => a.actual_time / 1000);
        this.setState({
          outcomeDistribution: new SampledDistribution(numbers)
        })
      })
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="slide basic-slide">
        <div style={{ padding: "15px 0" }}>{this.props.text}</div>
        <div style={{ width: "100%", maxWidth: "800px" }}>
          <EstimateAndOutcomeHistogram estimateDistribution={this.state.estimateDistribution}
            outcomeDistribution={this.state.outcomeDistribution} />
        </div>
      </div >
    );
  }
}
