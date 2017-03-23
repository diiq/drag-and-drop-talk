import * as React from 'react';
import { EstimateService, EstimateJSON } from 'estimate/estimate';

//import * as style from './single-estimate-histogram.scss';

export interface SingleEstimateHistogramProps { taskID: string };

export class SingleEstimateHistogram extends React.Component<SingleEstimateHistogramProps, {}> {
  state: {
    estimates: number[],
    average: number
  } = {
    estimates: [1],
    average: 1,
  }

  componentWillMount() {
    EstimateService.list(this.props.taskID).then((estimates) => {
      const numbers = estimates.map((e) => e.mode)
      const average = numbers.reduce((a, b) => a + b) / (numbers.length);
      this.setState({
        estimates: numbers,
        average: average
      })
    })
  }

  render() {
    return (
      <div className="slide basic-slide">
        <h1 className="title" style={{ height: "100%", justifyContent: "center" }}>
          Average estimate: <strong>{this.state.average.toFixed(1)}</strong> seconds</h1>
      </div >
    );
  }
}
