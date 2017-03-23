import * as React from 'react';
import * as ReactTestUtils from 'react-addons-test-utils';
import { shallow, ShallowWrapper } from 'enzyme';

import { Estimator } from './estimator.component';
import { Estimate } from '../../estimate/estimate.service';
import { Histogram } from '../histogram/histogram.component';
import { DraggableVerticalLine } from '../draggable-vertical-line/draggable-vertical-line.component';
import { HorizontalAxis } from '../horizontal-axis/horizontal-axis.component';


describe("Estimator", () => {
  let rendered: ShallowWrapper<any, {}>;

  const estimate = new Estimate({ mode: 5, ninety: 10 })
  const elt = (<Estimator estimate={estimate} samples={10000} />);

  beforeEach(() => {
    rendered = shallow(elt);
  });

  it("renders a histogram", () => {
    expect(rendered.find(Histogram).length).toBe(1);
  });

  it("renders an axis", () => {
    expect(rendered.find(HorizontalAxis).length).toBe(1);
  });

  it("renders draggable lines for mode and ninety", () => {
    expect(rendered.find(DraggableVerticalLine).length).toBe(2);
  });

  // TODO: Test that changeDistribution is called when lines are
  // dragged. That involves mocking out d3, or fully rendering
  // everything, and I'm lazy.
});
