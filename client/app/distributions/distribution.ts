import { max, histogram, Bin } from 'd3';
import { times, findIndex, indexOf } from 'lodash';


export class Distribution {
  samples = 10000;

  memoDistribution: () => number;
  memoValues: number[];
  memoDailyCounts: number[];
  memoCdf: number[];

  makeDistribution: () => () => number;

  distribution() {
    return this.memoDistribution || (this.memoDistribution = this.makeDistribution());
  }

  values() {
    return this.memoValues || (this.memoValues = times(this.samples, this.distribution()));
  }

  dailyCounts() {
    // Places all samples into day-wide bins.
    if (this.memoDailyCounts) {
      return this.memoDailyCounts;
    }

    const maxVal = Math.ceil(max(this.values()));
    const valBinner = histogram()
      .domain([0, maxVal])
      .thresholds(maxVal);

    return this.memoDailyCounts = valBinner(this.values()).map((d: Bin<number, number>) => d.length);
  }

  cdf() {
    if (this.memoCdf) {
      return this.memoCdf;
    }
    // Running sum of binned data
    let sum = 0;
    return this.memoCdf = this.dailyCounts().map((d: number) => sum += d);
  }

  quantile(percent: number) {
    const cdf = this.cdf()
    const maxout = percent * cdf[cdf.length - 1]
    return findIndex(cdf, (cum) => cum > maxout) + 1
  }

  mostLikely() {
    const days = this.dailyCounts();
    return indexOf(days, max(days)) + 1;
  }
}
