import APIError from '../../errors/APIError';
import delay from '../../utils/delay';

class HttpClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  requestUrl(url) {
    return `${this.baseUrl}${url}`;
  }

  async get(url) {
    await delay(500);
    const response = await fetch(this.requestUrl(url));

    const contentType = response.headers.get('Content-Type');
    const isJson = contentType.includes('application/json');

    let body = null;
    if (isJson) body = await response.json();

    if (response.ok) return body;

    throw new APIError(response, body);
  }
}

export default HttpClient;
