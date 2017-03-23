import { randomNormal, max, histogram } from 'd3';
import { times, findIndex } from 'lodash';
import { Distribution } from './distribution';
import { sample } from 'lodash';

interface Estimate {
  mode: number,
  extreme: number
}

const memo: { [id: string]: CompoundNormal } = {}


export class CompoundNormal extends Distribution {
  memoDistribution: () => number;
  memoValues: number[];
  memoDailyCounts: number[];
  memoCdf: number[];
  estimates: Estimate[];

  constructor(
    estimates: Estimate[],
    public samples = 10000) {
    super();

    const sig = estimates.map(e => `${e.mode},${e.extreme}`).join(';') + `s:${this.samples}`;
    if (memo[sig]) return memo[sig];

    this.estimates = estimates.slice();
    memo[sig] = this;
  }


  // This is very silly because a compounding of normals is normal.
  // Come back to this to speed it up.
  makeDistribution = () => {
    return () => {
      if (this.estimates.length == 0) return 0;
      const estimate = sample(this.estimates);
      return randomNormal(estimate.mode, 1)();
    }
  }
}
