import { Action } from './action';

describe("Action", () => {
  let action: Action;

  beforeEach(() => {
    action = new Action();
  });

  it("is there", () => {
    expect(action).toExist();
  });
});
