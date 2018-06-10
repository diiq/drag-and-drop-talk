import * as React from 'react';
import { EstimateService, EstimateJSON } from 'estimate/estimate';
import { Normal } from 'distributions/normal';
import { DistributionHistogram } from 'histograms/distribution-histogram/distribution-histogram.component';

//import * as style from './normal-estimate-histogram.scss';

export interface NormalEstimateHistogramProps { title: string, taskID: string, fakeout: number };

export class NormalEstimateHistogram extends React.Component<NormalEstimateHistogramProps, {}> {
  state: {
    estimateDistribution?: Normal
    mode?: number,
    extreme?: number,
  } = {}

  componentWillMount() {
    EstimateService.list(this.props.taskID).then((estimates) => {
      const mode = estimates.map(e => e.mode + this.props.fakeout).reduce((a, b) => a + b) / estimates.length;
      const extreme = estimates.map(e => e.extreme + this.props.fakeout).reduce((a, b) => a + b) / estimates.length;
      const distribution = new Normal(mode, extreme)
      this.setState({
        estimateDistribution: distribution,
        mode: mode,
        extreme: extreme
      })
    })
  }

  render() {
    return (
      <div className="slide basic-slide">
        <h1 className="title" style={{ height: "100%", justifyContent: "center" }}>{this.props.title}</h1>
        {!this.props.fakeout && <div>
          <div>{'Average "most likely" time:'} <strong>{this.state.mode}</strong> seconds</div>
          <div>{'Average "worst-case" time:'} <strong>{this.state.extreme}</strong> seconds</div>
        </div>}
        <div style={{ height: "400px", width: "100%", maxWidth: "600px" }}>
          {this.state.estimateDistribution && <DistributionHistogram distribution={this.state.estimateDistribution} fakeout={-this.props.fakeout} />}
        </div>
      </div >
    );
  }
}
