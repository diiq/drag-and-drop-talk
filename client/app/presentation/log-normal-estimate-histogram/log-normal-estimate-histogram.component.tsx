import * as React from 'react';
import { EstimateService, EstimateJSON } from 'estimate/estimate';
import { CompoundLogNormal } from 'distributions/compound-log-normal';
import { DistributionHistogram } from 'histograms/distribution-histogram/distribution-histogram.component';

//import * as style from './normal-estimate-histogram.scss';

export interface LogNormalEstimateHistogramProps { title: string, taskID: string, fakeout: number };

export class LogNormalEstimateHistogram extends React.Component<LogNormalEstimateHistogramProps, {}> {
  state: {
    estimateDistribution?: CompoundLogNormal
    mode?: number,
    extreme?: number,
  } = {}

  componentWillMount() {
    EstimateService.list(this.props.taskID).then((estimates) => {
      const distribution = new CompoundLogNormal(estimates)
      this.setState({
        estimateDistribution: distribution,
        mode: distribution.mostLikely(),
        extreme: distribution.quantile(.9)
      })
    })
  }

  render() {
    return (
      <div className="slide basic-slide">
        <h1 className="title" style={{ height: "100%", justifyContent: "center" }}>{this.props.title}</h1>
        <div className="content two-columns" style={{ width: "100%", alignItems: "center" }}>
          <div style={{ height: "400px", width: "100%" }}>
            {this.state.estimateDistribution && <DistributionHistogram distribution={this.state.estimateDistribution} fakeout={-this.props.fakeout} />}
          </div>
        </div>
      </div >
    );
  }
}
