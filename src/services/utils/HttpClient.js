import APIError from '../../errors/APIError';
import delay from '../../utils/delay';

class HttpClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  get(path, options) {
    return this.makeRequest(path, {
      method: 'GET',
      headers: options?.headers,
    });
  }

  post(path, options) {
    return this.makeRequest(path, {
      method: 'POST',
      body: options?.body,
      headers: options?.headers,
    });
  }

  put(path, options) {
    return this.makeRequest(path, {
      method: 'PUT',
      body: options?.body,
      headers: options?.headers,
    });
  }

  async makeRequest(path, options) {
    await delay(500);

    const url = `${this.baseUrl}${path}`;

    const headers = new Headers();

    if (options.body) {
      headers.append('Content-Type', 'application/json');
    }

    if (options.headers) {
      Object.entries(options.headers).forEach(([name, value]) => {
        headers.append(name, value);
      });
    }

    const response = await fetch(url, {
      headers,
      method: options.method,
      body: JSON.stringify(options.body),
    });

    const contentType = response.headers.get('Content-Type');
    const isJson = contentType.includes('application/json');

    let responseBody = null;
    if (isJson) responseBody = await response.json();

    if (response.ok) return responseBody;

    throw new APIError(response, responseBody);
  }
}

export default HttpClient;
