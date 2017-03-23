import { randomLogNormal, max, histogram } from 'd3';
import { times, findIndex } from 'lodash';
import { Distribution } from './distribution';


export function logNormal(mode: number, ninety: number) {
  // This math is further discussed elsewhere; converts mode and
  // ninety into mean and deviation, for d3's lognormal
  // implementation.

  const z = 1.3; // magic number (z-table) for '90%'

  const sigma = (-z + Math.sqrt(z * z - 4 * (Math.log(mode / ninety)))) / 2;
  const mu = Math.log(mode) + sigma * sigma;
  return randomLogNormal(mu, sigma);
}

export class LogNormal extends Distribution {
  memoDistribution: () => number;
  memoValues: number[];
  memoDailyCounts: number[];
  memoCdf: number[];


  constructor(
    public mode: number,
    public ninety: number,
    public samples = 10000) {
    super()
  }

  reconstruct(mode: number, ninety: number, samples = 10000) {
    if (mode === this.mode && ninety === this.ninety && samples === this.samples) {
      return this;
    } else {
      return new LogNormal(mode, ninety, samples);
    }
  }

  makeDistribution = () => {
    return logNormal(this.mode, this.ninety);
  }
}
