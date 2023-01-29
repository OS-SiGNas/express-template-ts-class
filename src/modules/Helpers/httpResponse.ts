import { type Response } from 'express'
import { config } from '../Config'

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
  #OK: number = 200
  #CREATED: number = 201
  #BAD_REQUEST: number = 400
  #NOT_FOUND: number = 404
  #UNAUTHORIZED: number = 401
  #FORBIDDEN: number = 403
  #INTERNAL_SERVER_ERROR: number = 500

  /*  #log (data: any): void { */
  /* console.log(data) */
  /* } */

  public ok (res: Response, data?: any): Response {
    return res.status(this.#OK).json({
      status: this.#OK,
      statusMsg: 'Success 👌',
      data
    })
  }

  public created (res: Response, data?: any): Response {
    return res.status(this.#CREATED).json({
      status: this.#CREATED,
      statusMsg: 'Created 👌',
      data
    })
  }

  public badRequest (res: Response, data?: any): Response {
    return res.status(this.#BAD_REQUEST).json({
      status: this.#BAD_REQUEST,
      statusMsg: 'Bad Request 🤦',
      error: data
    })
  }

  public notFound (res: Response, data?: any): Response {
    return res.status(this.#NOT_FOUND).json({
      status: this.#NOT_FOUND,
      statusMsg: 'Resourse Not Found 😕',
      error: data
    })
  }

  public unauthorized (res: Response, data?: any): Response {
    // this.#log(data)
    if (config.getEnvironment()) console.log(data)
    return res.status(this.#UNAUTHORIZED).json({
      status: this.#UNAUTHORIZED,
      statusMsg: 'Unauthorized 🤖🔒',
      error: data
    })
  }

  public forbidden (res: Response, data?: any): Response {
    return res.status(this.#FORBIDDEN).json({
      status: this.#FORBIDDEN,
      statusMsg: '🔒 Forbidden 🔒',
      error: data
    })
  }

  public error (res: Response, data?: any): Response {
    return res.status(this.#INTERNAL_SERVER_ERROR).json({
      status: this.#INTERNAL_SERVER_ERROR,
      statusMsg: 'Internal Server Error 🚑',
      error: data
    })
  }
}

// export const httpResponse = new HttpResponse();
