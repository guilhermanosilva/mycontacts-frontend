import delay from '../../utils/delay';

class HttpClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  requestUrl(url) {
    return `${this.baseUrl}${url}`;
  }

  async get(url) {
    const response = await fetch(this.requestUrl(url));
    await delay(500);
    return response.json();
  }
}

export default HttpClient;
