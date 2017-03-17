import { history } from 'app-history';
import { merge } from 'lodash';

declare const PRODUCTION: boolean;
if (PRODUCTION) {
  var { apiPath } = require('../environments/prod');
} else {
  var { apiPath } = require('../environments/dev');
}

class API {
  // Need to set which api url we're going for
  apiURL = apiPath
  defaultHeaders = {
    'Content-Type': 'application/json'
  }

  fetch(method: string, url: string, body?: {}, headers = {}): Promise<any> {
    let request: RequestInit = {
      method,
      credentials: 'include',
      headers: merge({}, this.defaultHeaders, headers)
    };
    if (method != 'GET' && body) {
      request.body = JSON.stringify(body);
    }
    return fetch(this.apiURL + url, request).then(
      response => response.json()
    );
  }

  get(url: string) {
    return this.fetch('GET', url);
  }

  post(url: string, data: {}) {
    return this.fetch('POST', url, data);
  }

  put(url: string, data: {}) {
    return this.fetch('PUT', url, data);
  }

  delete(url: string) {
    return this.fetch('DELETE', url);
  }
}

export default new API();
