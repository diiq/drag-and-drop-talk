import { randomNormal, max, histogram } from 'd3';
import { times, findIndex } from 'lodash';
import { Distribution } from './distribution';
import { sample } from 'lodash';


export class Normal extends Distribution {
  memoDistribution: () => number;
  memoValues: number[];
  memoDailyCounts: number[];
  memoCdf: number[];

  constructor(
    public mode: number,
    public extreme: number,
    public samples = 10000) {
    super()
  }


  // This is very silly because a compounding of normals is normal.
  // Come back to this to speed it up.
  makeDistribution = () => {
    return randomNormal(this.mode, (this.extreme - this.mode) / 2);
  }
}
