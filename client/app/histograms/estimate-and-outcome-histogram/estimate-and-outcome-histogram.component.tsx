import * as React from 'react';
//import * as style from './estimate-and-outcome-histogram.scss';
import { DistributionHistogram } from 'histograms/distribution-histogram/distribution-histogram.component';
import { Distribution } from 'distributions/distribution';


export interface EstimateAndOutcomeHistogramProps { estimateDistribution: Distribution, outcomeDistribution: Distribution };

export class EstimateAndOutcomeHistogram extends React.Component<EstimateAndOutcomeHistogramProps, {}> {
  render() {
    const estimateMax = Math.max(this.props.estimateDistribution.quantile(.99) + 1, 5)
    const outcomeMax = Math.max(this.props.outcomeDistribution.quantile(.99) + 1, 5)
    const max = Math.max(estimateMax, outcomeMax);
    return (
      <div style={{ width: "100%", height: "100%", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
          <DistributionHistogram distribution={this.props.outcomeDistribution} max={max} />
        </div>
        <div className="estimate" style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }} >
          <DistributionHistogram distribution={this.props.estimateDistribution} max={max} />
        </div>
      </div>
    );
  }
}
