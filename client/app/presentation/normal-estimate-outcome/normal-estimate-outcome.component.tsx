import * as React from 'react';
import { EstimateService, EstimateJSON } from 'estimate/estimate';
import { ActionService, ActionJSON } from 'action/action';
import { SampledDistribution } from 'distributions/sampled-distribution';
import { Normal } from 'distributions/normal';
import { EstimateAndOutcomeHistogram } from 'histograms/estimate-and-outcome-histogram/estimate-and-outcome-histogram.component';
import poll from 'poll';
//import * as style from './normal-estimate-outcome.scss';

export interface NormalEstimateOutcomeProps { taskID: string, text: string };

export class NormalEstimateOutcome extends React.Component<NormalEstimateOutcomeProps, {}> {
  state: {
    estimateDistribution: Normal,
    outcomeDistribution: SampledDistribution,
  } = {
    estimateDistribution: new Normal(2, 5),
    outcomeDistribution: new SampledDistribution([1]),
  }
  interval?: () => void

  componentWillMount() {
    EstimateService.list(this.props.taskID).then((estimates) => {
      const mode = estimates.map(e => e.mode).reduce((a, b) => a + b) / estimates.length;
      const extreme = estimates.map(e => e.extreme).reduce((a, b) => a + b) / estimates.length;
      const distribution = new Normal(mode, extreme)
      this.setState({
        estimateDistribution: distribution
      })
    });

    this.interval = poll(() => {
      return ActionService.list(this.props.taskID).then((actions) => {
        const numbers = actions.map(a => a.actual_time);
        this.setState({
          outcomeDistribution: new SampledDistribution(numbers)
        })
      })
    })
  }

  componentWillUnmount() {
    this.interval();
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
