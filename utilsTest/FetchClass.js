class Fetch {
  #url;
  #token;
  /**
   * @constructs
   * @param url -> 'http://mydomain.com'
   * @param token -> 'Bearer token' */
  constructor(url, token) {
    this.#url = url ?? '';
    this.#token = token ?? '';
  }
  /**
   * use .get<MyInterfaceResponse>(endpoint) for types
   * @param endpoint -> like "/route" */
  get = async (endpoint) => {
    return await this.#request({ method: 'GET', endpoint });
  };

  /**
   * use .get<MyInterfaceResponse>(endpoint, body) for types
   * @param endpoint -> "/route" */
  post = async (endpoint, body) => {
    return await this.#request({ method: 'POST', endpoint, body });
  };

  /**
   * use .get<MyInterfaceResponse>(endpoint, body) for types
   * @param endpoint -> "/route" */
  put = async (endpoint, body) => {
    return await this.#request({ method: 'PUT', endpoint, body });
  };

  /**
   * use .get<MyInterfaceResponse>(endpoint) for types
   * @param endpoint -> "/route" */
  del = async (endpoint) => {
    return await this.#request({ method: 'DELETE', endpoint });
  };

  #request = async ({ method, endpoint, body }) => {
    const response = await global.fetch(`${this.#url}${endpoint}`, this.#options({ method, body }));
    return await response.json();
  };

  #options = ({ method, body }) => {
    return {
      method,
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.#token}`,
      },
      body: JSON.stringify(body),
    };
  };

  get token() {
    return this.#token;
  }
  /**
   * Set your Bearer token */
  set token(token) {
    this.#token = token;
  }
}

module.exports = Fetch;
