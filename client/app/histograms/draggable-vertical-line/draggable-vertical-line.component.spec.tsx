import * as React from 'react';
import * as ReactTestUtils from 'react-addons-test-utils';
import { shallow, ShallowWrapper } from 'enzyme';
import { DraggableVerticalLine, DraggableVerticalLineProps } from './draggable-vertical-line.component';

describe("Bar", () => {
  const elt = <DraggableVerticalLine x={10} y0={0} y1={100} />;
  let rendered: ShallowWrapper<any, {}>;
  beforeEach(() => {
    rendered = shallow(elt);
  });

  describe("renders a group", () => {
    it("contains a line", () => {
      expect(rendered.find('line').length).toBe(1);
    });

    it("contains two triangles", () => {
      expect(rendered.find('polygon').length).toBe(2);
    });

    it("contains a handle rect", () => {
      expect(rendered.find('rect').length).toBe(1);
    });
  });

  describe("methods", () => {
    let line: DraggableVerticalLine;
    beforeEach(() => {
      line = rendered.instance() as DraggableVerticalLine;
    });

    describe("height", () => {
      it("returns distance from bottom to top", () => {
        expect(line.height()).toBe(100);
      });
    });

    describe("polyPoints", () => {
      it("returns a string representing the given points", () => {
        expect(line.polyPoints([[1, 2], [3, 4], [5, 6]])).toEqual("1,2 3,4 5,6");
      });
    });

    describe("rightPoints", () => {
      it("returns points for a triangle pointed right, at the center of the line", () => {
        expect(line.rightPoints()).toEqual("3,46 3,54 7,50");
      });
    });

    describe("leftPoints", () => {
      it("returns points for a triangle pointed left, at the center of the line", () => {
        expect(line.leftPoints()).toEqual("-3,46 -3,54 -7,50");
      });
    });
  });
});
