import { sample } from 'lodash';
import { Distribution } from './distribution';


export class SingleEstimateDistribution extends Distribution {
  memoDistribution: () => number;
  memoValues: number[];
  memoDailyCounts: number[];
  memoCdf: number[];

  constructor(
    public estimates: number[],
    public samples: number = 10000) {
    super()
  }

  makeDistribution = () => {
    return () => sample(this.estimates);
  }
}
