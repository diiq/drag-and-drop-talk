import API from 'api/api';


export interface StateJSON {
  taskID: string,
  name: string
}

export const StateService = new class {
  get(): Promise<StateJSON> {
    return API.get('state');
  }

  set(name: string, task_id: string): Promise<StateJSON> {
    return API.put('state', { name: name, task_id: task_id });
  }
}();
