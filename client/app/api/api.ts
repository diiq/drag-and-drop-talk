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

  // Login is treated specially because the request is unauthorized
  // but the response has auth headers.
  login(email: string, password: string) {
    return this.fetch('POST', 'auth/sign_in.json', {
      email: email,
      password: password
    })
  }

  // need method for logout
  logout() {
    return this.fetch('DELETE', 'auth/sign_out.json')
      .then((response: Response) => {
        this.forgetAuthHeaders();
        return response;
      })
  }

  // need method for storing/replacing current headers.
  storeAuthHeaders(headers: Headers) {
    if (!headers.get('access-token')) return;
    if (parseInt(headers.get('expiry')) <
      parseInt(localStorage.getItem('trajectoryExpiry'))) return;

    localStorage.setItem('trajectoryUid', headers.get('uid'));
    localStorage.setItem('trajectoryClient', headers.get('client'));
    localStorage.setItem('trajectoryToken', headers.get('access-token'));
    localStorage.setItem('trajectoryExpiry', headers.get('expiry'));
  }

  forgetAuthHeaders() {
    localStorage.removeItem('trajectoryUid');
    localStorage.removeItem('trajectoryClient');
    localStorage.removeItem('trajectoryToken');
    localStorage.removeItem('trajectoryExpiry');
  }

  getAuthHeaders() {
    return merge({}, this.defaultHeaders, {
      'uid': localStorage.getItem('trajectoryUid'),
      'client': localStorage.getItem('trajectoryClient'),
      'access-token': localStorage.getItem('trajectoryToken'),
    })
  }
}

export default new API();
