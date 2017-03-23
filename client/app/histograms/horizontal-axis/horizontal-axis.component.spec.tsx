import * as React from 'react';
import * as ReactTestUtils from 'react-addons-test-utils';
import { shallow } from 'enzyme';
import { scaleLinear } from 'd3';

import { HorizontalAxis } from './horizontal-axis.component';

describe("HorizontalAxis", () => {
  const scale = scaleLinear().domain([0, 5]).range([0, 10])
  const elt = <HorizontalAxis scale={scale} yOffset={5} />

  const bigScale = scaleLinear().domain([0, 80]).range([0, 160])
  const bigScaleElt = <HorizontalAxis scale={bigScale} yOffset={5} />

  it("renders an axis group", () => {
    const rendered = shallow(elt);
    expect(rendered.find('g').length).toBe(1);
  });

  describe("methods", () => {
    let axis: HorizontalAxis;
    beforeEach(() => {
      axis = shallow(elt).instance() as HorizontalAxis;
    });

    describe("max", () => {
      it("returns end of domain", () => {
        expect(axis.max()).toBe(5);
      });
    });

    describe("ticks", () => {
      it("returns domain if domain < 60", () => {
        expect(axis.ticks()).toBe(5);
      });

      it("returns domain if domain < 60", () => {
        let bigAxis = shallow(bigScaleElt).instance() as HorizontalAxis;
        expect(bigAxis.ticks()).toBe(16);
      });
    });


    describe("tickFormat", () => {
      describe("when domain < 60 days", () => {
        it("returns nothing if tick isn't the end of a business week", () => {
          expect(axis.tickFormat(3)).toBe("");
        });

        it("returns 'n' if tick is the end of a business week", () => {
          expect(axis.tickFormat(5)).toBe("5");
        });
      });
      describe("when domain > 60 days", () => {
        it("returns nothing if tick isn't the end of a business month", () => {
          let bigAxis = shallow(bigScaleElt).instance() as HorizontalAxis;
          expect(bigAxis.tickFormat(15)).toBe("");
        });

        it("returns 'n' if tick isn't the end of a business month", () => {
          let bigAxis = shallow(bigScaleElt).instance() as HorizontalAxis;
          expect(bigAxis.tickFormat(40)).toBe("40");
        });
      });
    });
  });
});
