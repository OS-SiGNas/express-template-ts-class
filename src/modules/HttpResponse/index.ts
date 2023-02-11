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

  /*  #log (data: any): void { */
  /* console.log(data) */
  /* } */

  ok = (res: Response, data?: any): Response => {
    if (config.environment) console.log(data);
    return res.status(this.#OK).json({
      status: this.#OK,
      statusMsg: 'Success 👌',
      data,
    });
  };

  created = (res: Response, data?: any): Response => {
    if (config.environment) console.log(data);
    return res.status(this.#CREATED).json({
      status: this.#CREATED,
      statusMsg: 'Created 👌',
      data,
    });
  };

  badRequest = (res: Response, data?: any): Response => {
    if (config.environment) console.log(data);
    return res.status(this.#BAD_REQUEST).json({
      status: this.#BAD_REQUEST,
      statusMsg: 'Bad Request 🤦',
      error: data,
    });
  };

  notFound = (res: Response, data?: any): Response => {
    if (config.environment) console.log(data);
    return res.status(this.#NOT_FOUND).json({
      status: this.#NOT_FOUND,
      statusMsg: 'Resourse Not Found 😕',
      error: data,
    });
  };

  unauthorized = (res: Response, data?: any): Response => {
    if (config.environment) console.log(data);
    return res.status(this.#UNAUTHORIZED).json({
      status: this.#UNAUTHORIZED,
      statusMsg: 'Unauthorized 🤖🔒',
      error: data,
    });
  };

  forbidden = (res: Response, data?: any): Response => {
    if (config.environment) console.log(data);
    return res.status(this.#FORBIDDEN).json({
      status: this.#FORBIDDEN,
      statusMsg: '🔒 Forbidden 🔒',
      error: data,
    });
  };

  error = (res: Response, data?: any): Response => {
    if (config.environment) console.log(data);
    return res.status(this.#INTERNAL_SERVER_ERROR).json({
      status: this.#INTERNAL_SERVER_ERROR,
      statusMsg: 'Internal Server Error 🚑',
      error: data,
    });
  };
}

export const httpResponse = new HttpResponse();
