import API from 'api/api';


export interface ActionJSON {
  id: string,
  taskID: string,
  emoji: string,
  person_id: string,
  actual_time: number
}

export const config: {
  emoji?: string;
} = {};

export const ActionService = new class {
  create(task_id: string, milliseconds: number): Promise<ActionJSON> {
    return API.post('actions', { task_id: task_id, actual_time: milliseconds }).then(
      val => {
        config.emoji = val.emoji;
        return val
      });
  }

  list(task_id: string): Promise<ActionJSON[]> {
    return API.get(`actions?task_id=${task_id}`).then(actions => actions.actions);
  }
}();
