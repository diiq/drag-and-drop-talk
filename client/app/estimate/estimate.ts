import API from 'api/api';


export interface EstimateJSON {
  type?: string,
  mode: number,
  extreme: number,
  rationale?: string,
  taskID?: string,
}

export const EstimateService = new class {
  create(task_id: string, mode: number, extreme: number): Promise<EstimateJSON> {
    return API.post('estimates', { task_id: task_id, mode: mode, extreme: extreme })
  }

  list(task_id: string): Promise<EstimateJSON[]> {
    return API.get(`estimates?task_id=${task_id}`);
  }
}();
