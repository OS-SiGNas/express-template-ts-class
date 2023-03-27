import type { Response } from 'express';
import { environment } from '../../server/Settings';
import type { Environment } from '../../server/types';

interface Status {
  code: number;
  message: string;
}

interface Pagination {
  offset: number;
  limit: number;
}

export class HttpResponse {
  readonly #OK: Status = { code: 200, message: 'Success 👌' };
  readonly #CREATED: Status = { code: 201, message: 'Created 👌' };
  readonly #BAD_REQUEST: Status = { code: 400, message: 'Bad Request 🤦' };
  readonly #UNAUTHORIZED: Status = { code: 401, message: 'Unauthorized 🤖🔒' }; // sin token
  // readonly #PAYMENT_REQUIRED: Status = { code: 402, message: 'Payment Required 🤌💳' };
  readonly #FORBIDDEN: Status = { code: 403, message: '🔒 Forbidden 🔒' }; // sin rol
  readonly #NOT_FOUND: Status = { code: 404, message: 'Resourse Not Found 😕' };
  // readonly #GONE: Status = { code: 410, message: 'Access to the target resource is no longer available' };
  readonly #UNPROCESABLE_CONTENT: Status = { code: 422, message: 'Unprocessable Content 😕 please fix and try again' };
  // readonly #LEGAL_UNAVAILABLE: Status = { code: 451, message: 'Unavailable For Legal Reasons' };
  readonly #INTERNAL_SERVER_ERROR: Status = { code: 500, message: 'Internal Server Error 🚑' };
  readonly #UNAVAILABLE: Status = { code: 503, message: 'Service Unavailable ⏳ try later' };
  // readonly #TIMEOUT: Status = {code:504, message:'Gateway Timeout ⌛'}
  readonly #debug: boolean;
  constructor(env: Environment) {
    this.#debug = env === 'dev';
  }

  #logger = (data: unknown): void => {
    if (this.#debug && data !== undefined) {
      console.log('======================  🕵️ logger  ======================');
      console.trace(data);
      console.log('====================== end logger ======================');
    }
  };

  /** Use this method for status Ok:200 */
  public ok = (res: Response, data?: object, pag?: Pagination): Response => {
    this.#logger(data);
    const { code, message } = this.#OK;
    return res.status(code).json({ code, message, pag, data });
  };

  /** Use this method for status Created:201 */
  public created = (res: Response, data?: object): Response => {
    this.#logger(data);
    res.status(201);
    return res.json({ ...this.#CREATED, data });
  };

  /** Use this method for status Bad Request:400 */
  public badRequest = (res: Response, error?: object | string): Response => {
    this.#logger(error);
    res.status(400);
    return res.json({ ...this.#BAD_REQUEST, error });
  };

  /** Use this method for status Unauthorized:401 */
  public unauthorized = (res: Response, error?: string): Response => {
    this.#logger(error);
    res.status(401);
    return res.json({ ...this.#UNAUTHORIZED, error });
  };

  /** Use this method for status Forbidden:403 */
  public forbidden = (res: Response, error?: object | string): Response => {
    this.#logger(error);
    res.status(403);
    return res.json({ ...this.#FORBIDDEN, error });
  };

  /** Use this method for status notFound:404 */
  public notFound = (res: Response, error?: string): Response => {
    this.#logger(error);
    res.status(404);
    return res.json({ ...this.#NOT_FOUND, error });
  };

  /** Use this method for status Unprocessable:422 */
  public unprocessable = (res: Response, error: object): Response => {
    this.#logger(error);
    const { code, message } = this.#UNPROCESABLE_CONTENT;
    return res.status(code).json({ code, message, error });
  };

  /** Use this method for handling errors status:500+ */
  public error = (res: Response, error: unknown): Response => {
    this.#logger(error);
    const { code, message } = this.#INTERNAL_SERVER_ERROR;
    if (error instanceof Error) {
      if (error.name === 'MongoServerError') {
        const { code, message } = this.#UNAVAILABLE;
        return res
          .status(code)
          .json({ code, message, error: 'this error will be reported and corrected as soon as possible' });
      }
      return res.status(code).json({ code, message, error });
    }
    return res.status(code).json({ code, message, error: String(error) });
  };
}

export default new HttpResponse(environment);
