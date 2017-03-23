import API from 'api/api';


export interface StateJSON {
  taskID: string,
  name: string
}

export const StateService = new class {
  get(): Promise<StateJSON> {
    return API.get('state');
  }

  set(name: string, taskID: string): Promise<StateJSON> {
    return API.post('state', { name: name, task_id: taskID });
  }
}();
