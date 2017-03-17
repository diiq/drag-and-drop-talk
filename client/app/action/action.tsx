import API from 'api/api';


export interface ActionJSON {
  id: string,
  taskID: string,
  verification: string
}

export const config: {
  verification?: string;
} = {};

export const ActionService = new class {
  create(task_id: string, milliseconds: number): Promise<ActionJSON> {
    return API.post('actions', { task_id: task_id, actual_time: milliseconds }).then(
      val => {
        config.verification = val.verification;
        return val
      });
  }

  list(task_id: string): Promise<ActionJSON> {
    return API.get(`actions?task_id=${task_id}`);
  }
}();
