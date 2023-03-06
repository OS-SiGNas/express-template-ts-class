import { httpResponse } from '../shared';

import type { Request, Response, NextFunction, RequestHandler } from 'express';
import type { Rol, Payload } from './types';

export default class UsersMiddleware {
  readonly #verifyJwt: (token: string) => Payload;
  constructor(verifyJwt: (token: string) => Payload) {
    this.#verifyJwt = verifyJwt;
  }

  checkSession = (rol: Rol): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction): Response | undefined => {
      const { authorization } = req.headers;
      if (authorization === undefined) return httpResponse.badRequest(res, 'Missing authorization headers');
      const token = authorization.split(' ').pop();
      try {
        const payload = this.#verifyJwt(String(token));
        if (payload.roles.includes(rol)) {
          // console.log(`Welcome ${rol}`);
          req.body.dataToken = payload;
          next();
          return undefined;
        } else {
          return httpResponse.unauthorized(res, `Only ${rol} on this endpoint`);
        }
      } catch (error) {
        return httpResponse.unauthorized(res, error);
      }
    };
  };
}
