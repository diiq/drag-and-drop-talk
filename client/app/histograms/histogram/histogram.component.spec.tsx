import * as React from 'react';
import * as ReactTestUtils from 'react-addons-test-utils';
import { shallow, mount } from 'enzyme';
import { scaleLinear } from 'd3';

import { Histogram } from './histogram.component';
import { Bar } from './bar/bar.component';



describe("Histogram", () => {
  // This scale maps 1->2 for ease of testing
  const scale = scaleLinear().domain([0, 5]).range([0, 10])
  const elt = <Histogram values={[1, 2, 3, 4, 5]} xScale={scale} yScale={scale} transitionDuration={0} />

  it("renders a bar for each value", () => {
    const rendered = shallow(elt)
    expect(rendered.find(Bar).length).toBe(5);
  });

  it("renders a bars of the appropriate height for each value", () => {
    const rendered = shallow(elt)
    let bars = rendered.find(Bar)
    expect(bars.map(b => b.props().height)).toEqual([2, 4, 6, 8, 10]);
  });

  it(".dimensionsForDayN returns dimensions using the x/y scales", () => {
    const instance = shallow(elt).instance() as Histogram;
    expect(instance.dimensionsForDayN(3, 4)).toEqual({ x: 6, y: 2, width: 2, height: 8 });
  });
});
