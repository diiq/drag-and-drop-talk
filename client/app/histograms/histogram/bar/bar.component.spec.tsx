import * as React from 'react';
import * as ReactTestUtils from 'react-addons-test-utils';
import { shallow } from 'enzyme';
import { Bar, BarProps } from './bar.component';

const elt = <Bar x={120} y={120} width={50} height={100} transitionDuration={0} />

describe("Bar", () => {
  it("renders a rectangle", () => {
    const rendered = shallow(elt);
    const expected = <rect className="bar" x={120} y={120} width={50} height={100} />;
    expect(rendered.matchesElement(expected)).toBeTruthy();
  });

  it("caches props into state", () => {
    const rendered = shallow(elt);
    let initial = { x: 120, y: 120, width: 50, height: 100, transitionDuration: 0 }
    expect(rendered.state()).toEqual(initial);
  });

  it("starts with .performCallbaks true", () => {
    const rendered = shallow(elt);
    let instance = rendered.instance() as Bar
    expect(instance.performCallbacks).toBeTruthy
  });

  it("unmounting sets .performCallbacks false", () => {
    const rendered = shallow(elt);
    let instance = rendered.instance() as Bar
    instance.componentWillUnmount();
    expect(instance.performCallbacks).toBeFalsy();
  });
});
