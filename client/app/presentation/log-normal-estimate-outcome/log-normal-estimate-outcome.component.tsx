import * as React from 'react';
import { EstimateService, EstimateJSON } from 'estimate/estimate';
import { ActionService, ActionJSON } from 'action/action';
import { SampledDistribution } from 'distributions/sampled-distribution';
import { CompoundLogNormal } from 'distributions/compound-log-normal';
import { EstimateAndOutcomeHistogram } from 'histograms/estimate-and-outcome-histogram/estimate-and-outcome-histogram.component';
import poll from 'poll';

//import * as style from './normal-estimate-outcome.scss';

export interface LogNormalEstimateOutcomeProps { taskID: string, text: string };

export class LogNormalEstimateOutcome extends React.Component<LogNormalEstimateOutcomeProps, {}> {
  state: {
    estimateDistribution: CompoundLogNormal,
    outcomeDistribution: SampledDistribution,
  } = {
    estimateDistribution: new CompoundLogNormal([{ mode: 2, extreme: 5 }]),
    outcomeDistribution: new SampledDistribution([]),
  }
  interval?: () => void

  componentWillMount() {
    EstimateService.list(this.props.taskID).then((estimates) => {
      const distribution = new CompoundLogNormal(estimates)
      this.setState({
        estimateDistribution: distribution
      })
    });

    this.interval = poll(() => {
      return ActionService.list(this.props.taskID).then((actions) => {
        const numbers = actions.map(a => a.actual_time / 1000);
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
