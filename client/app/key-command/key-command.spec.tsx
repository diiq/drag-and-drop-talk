import * as React from 'react';
import { shallow } from 'enzyme';

import { Action } from 'focus';
import { KeyCommand } from './key-command';

function actionForKeys(keys: string[]) {
  return new Action({
    name: "",
    shortDocumentation: "",
    searchTerms: [],
    actOn() { },
    defaultKeys: keys
  });
}

describe("KeyCommand", () => {
  it("Given an action with a single-key keybinding, displays it", () => {
    const elt = <KeyCommand action={actionForKeys(["a"])} />;
    const rendered = shallow(elt);
    expect(rendered.text()).toBe("a");
  });

  it("Given an action with two single-key keybindings, lists both", () => {
    const elt = <KeyCommand action={actionForKeys(["a", "b"])} />;
    const rendered = shallow(elt);
    expect(rendered.text()).toBe("a or b");
  });

  it("Given a keybindung with a shift, it shows the shift character", () => {
    const elt = <KeyCommand action={actionForKeys(["Shift+A"])} />;
    const rendered = shallow(elt);
    expect(rendered.text()).toBe("⇧A");
  });

  it("Given an action with no keybinding, shows nothing", () => {
    const elt = <KeyCommand action={actionForKeys([])} />;
    const rendered = shallow(elt);
    expect(rendered.text()).toBe("");
  });
});
