import { Task } from './task';

describe("Task", () => {
  let task: Task;

  beforeEach(() => {
    task = new Task();
  });

  it("is there", () => {
    expect(task).toExist();
  });
});
