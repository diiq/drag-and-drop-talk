import { randomNormal, max, histogram } from 'd3';
import { times, findIndex } from 'lodash';
import { Distribution } from './distribution';
import { logNormal } from './log-normal';
import { sample } from 'lodash';

interface Estimate {
  mode: number,
  ninety: number
}

const memo: { [id: string]: CompoundLogNormal } = {}


export class CompoundLogNormal extends Distribution {
  memoDistribution: () => number;
  memoValues: number[];
  memoDailyCounts: number[];
  memoCdf: number[];
  estimates: Estimate[];

  constructor(
    estimates: Estimate[],
    public samples = 10000) {
    super();

    const sig = estimates.map(e => `${e.mode},${e.ninety}`).join(';') + `s:${this.samples}`;
    if (memo[sig]) return memo[sig];

    this.estimates = estimates.slice();
    memo[sig] = this;
  }

  makeDistribution = () => {
    return () => {
      if (this.estimates.length == 0) return 0;
      const estimate = sample(this.estimates);
      return logNormal(estimate.mode, estimate.ninety)();
    }
  }
}
