import { apiPath } from 'environments/current';
import { go } from 'router';
import * as ActionCable from 'actioncable';
import { cablePath } from 'environments/current';
const uuid = require('uuid/v4') as () => string;

class API {
  // Need to set which api url we're going for
  apiURL = apiPath
  consumerMemo: ActionCable.Cable
  defaultHeaders = {
    'Content-Type': 'application/json'
  }
  memoAuthHeaders: {
    uid: string,
    client: string
    'access-token': string
    expiry: string
  }

  fetch(method: string, url: string, body?: {}, headers = {}) {
    let request: {method: string, headers: {}, credentials: string, body?: string} = {
      method,
      headers: Object.assign({}, this.defaultHeaders, headers),
      credentials: 'include'
    };

    if (method != 'GET' && body) {
      request.body = JSON.stringify(body);
    }
    return (fetch as any)(this.apiURL + url, request);
  }

  authFetch(method: string, url: string, body?: {}): Promise<any> {
    return this.fetch(method, url, body)
      .then((response: Response) => {
        if (response.status === 401) {
          go('/login');
          return { errors: ["Not a valid email/password combination. Please try again."] };
        }
        if (response.status === 204) {
          return Promise.resolve({});
        }
        if (response.status > 299) {
          return response.json().then(e => {throw e})
        }
        return response.json();
      }).then((response: { errors?: any }) => {
        if (response.errors)
          throw response.errors;
        return response;
      })
  }

  get(url: string, params?:{}) {
    if (params) {
      const pms = Object.keys(params).map(k => `${k}=${params[k]}`).join("&");
      url = url + "?" + pms;
    }
    return this.authFetch('GET', url);
  }

  post(url: string, data: {}) {
    return this.authFetch('POST', url, data);
  }

  put(url: string, data: {}) {
    return this.authFetch('PUT', url, data);
  }

  delete(url: string) {
    return this.authFetch('DELETE', url);
  }

  // Actioncable stuff; if grows to more than 4 methods, move elsewhere

  // UUID this window of this browser, so that we can safely ignore streaming
  // updates that *we* caused, and so already know about.
  streamId = uuid();

  // There's only one consumer per browser window, though there might be many
  // subscriptions.
  get consumer() {
    if (!this.consumerMemo) {
      this.consumerMemo = ActionCable.createConsumer("");
      this.setCableUrl();
    }
    return this.consumerMemo;
  }

  setCableUrl() {
    // Do auth here if/when necessary
    this.consumer['url'] = cablePath;
  }

  subscribe(props: any, handlers: ActionCable.CreateMixin) {
    return this.consumer.subscriptions.create(props, handlers);
  }
}

export default new API();
