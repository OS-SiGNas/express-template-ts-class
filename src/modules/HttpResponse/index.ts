import { type Response } from 'express';
import { config } from '../../Server/config';

/* enum HttpStatus {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  INTERNAL_SERVER_ERROR = 500,
} */

export class HttpResponse {
  readonly #OK: number = 200;
  readonly #CREATED: number = 201;
  readonly #BAD_REQUEST: number = 400;
  readonly #NOT_FOUND: number = 404;
  readonly #UNAUTHORIZED: number = 401;
  readonly #FORBIDDEN: number = 403;
  readonly #INTERNAL_SERVER_ERROR: number = 500;
  readonly #debug: boolean;
  constructor(debug: boolean) {
    this.#debug = debug;
  }

  #logger = (data: any): void => {
    if (this.#debug) console.dir(data);
  };

  ok = (res: Response, data?: any): Response => {
    this.#logger(data);
    return res.status(this.#OK).json({
      status: this.#OK,
      statusMsg: 'Success 👌',
      data,
    });
  };

  created = (res: Response, data?: any): Response => {
    this.#logger(data);
    return res.status(this.#CREATED).json({
      status: this.#CREATED,
      statusMsg: 'Created 👌',
      data,
    });
  };

  badRequest = (res: Response, error?: any): Response => {
    this.#logger(error);
    return res.status(this.#BAD_REQUEST).json({
      status: this.#BAD_REQUEST,
      statusMsg: 'Bad Request 🤦',
      error,
    });
  };

  notFound = (res: Response, error?: any): Response => {
    this.#logger(error);
    return res.status(this.#NOT_FOUND).json({
      status: this.#NOT_FOUND,
      statusMsg: 'Resourse Not Found 😕',
      error,
    });
  };

  unauthorized = (res: Response, error?: any): Response => {
    this.#logger(error);
    return res.status(this.#UNAUTHORIZED).json({
      status: this.#UNAUTHORIZED,
      statusMsg: 'Unauthorized 🤖🔒',
      error,
    });
  };

  forbidden = (res: Response, error?: any): Response => {
    this.#logger(error);
    return res.status(this.#FORBIDDEN).json({ status: this.#FORBIDDEN, statusMsg: '🔒 Forbidden 🔒', error });
  };

  error = (res: Response, error?: any): Response => {
    this.#logger(error);
    if (error.name) {
      return res.status(error?.status).json({
        status: error?.status,
        errorType: error?.name,
        errorMsg: error?.message,
      });
    } else {
      return res.status(this.#INTERNAL_SERVER_ERROR).json({
        status: this.#INTERNAL_SERVER_ERROR,
        errorMsg: 'Internal Server Error 🚑',
        error,
      });
    }
  };
}

export const httpResponse = new HttpResponse(config.environment === 'dev');
