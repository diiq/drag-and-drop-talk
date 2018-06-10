import * as React from 'react';
import { mount } from 'enzyme';

import { Button } from './button';

describe("Button", () => {
  it("Takes the action when clicked", () => {
    var foo = 1;
    const elt = <Button action={() => foo = 2} />;
    const rendered = mount(elt);
    rendered.simulate('click');
    expect(foo).toBe(2);
  });

  it("Displays its children", () => {
    const elt = <Button action={() => { }}>Ima Button</Button>;
    const rendered = mount(elt);
    expect(rendered.text()).toBe("Ima Button");
  });
});
