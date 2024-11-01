import { IHttpProxy, Method, Req1, Req2, RequestParams } from '../../Domain/IHttpProxy';

interface Dependences {
  url?: string;
  mode?: RequestMode;
  cache?: RequestCache;
  credentials?: RequestCredentials;
  headers?: HeadersInit;
}

export class HttpProxy implements IHttpProxy {
  readonly #name = `${this.constructor.name}`;
  readonly #url: string;
  #defaultOptions: RequestInit;

  constructor(d: Readonly<Dependences>) {
    this.#url = d.url ?? '';

    this.#defaultOptions = {
      credentials: d.credentials ?? 'same-origin',
      cache: d.cache ?? 'no-cache',
      mode: d.mode ?? 'cors',
      headers: d.headers ?? {
        ['content-type']: 'application/json',
      },
    };
  }

  public readonly get: Req1 = async (endpoint) => await this.#request({ method: 'GET', endpoint });
  public readonly post: Req2 = async (endpoint, body) => await this.#request({ method: 'POST', endpoint, body });
  public readonly put: Req2 = async (endpoint, body) => await this.#request({ method: 'PUT', endpoint, body });
  public readonly patch: Req2 = async (endpoint, body) => await this.#request({ method: 'PATCH', endpoint, body });
  public readonly del: Req1 = async (endpoint) => await this.#request({ method: 'DELETE', endpoint });
  public readonly sendRequest = async <R>(request: RequestParams): Promise<R> => await this.#request<R>(request);

  readonly #request = async <R>({ method, endpoint, body }: RequestParams): Promise<R> => {
    const path = `${this.#url}${endpoint}`;
    const options = await this.#getOptions(method, body);
    console.info(`🌎 [${this.#name}]: ${path}`);
    const response = await globalThis.fetch(path, options);
    const contentType = response.headers.get('content-type');
    // TODO: add middlewares implement
    if (contentType !== null && contentType.includes('json')) return await response.json();
    return response as R;
  };

  readonly #getOptions = async (method: Method, body?: object): Promise<Readonly<RequestInit>> => {
    return await Promise.resolve({ ...this.#defaultOptions, method, body: JSON.stringify(body) });
  };

  set token(token: string) {
    const headers: HeadersInit = {
      ...this.#defaultOptions.headers,
      Authorization: `Bearer ${token}`,
    };

    this.#defaultOptions.headers = headers;
  }
}
