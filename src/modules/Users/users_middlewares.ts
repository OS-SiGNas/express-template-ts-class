import { type Request, type Response, type NextFunction, type RequestHandler } from 'express';
import { httpResponse } from '../shared/httpResponse';
import { userService } from './users_service';

import { Rol } from '../types';

export const checkSession =
  (rol: Rol): RequestHandler =>
  (req: Request, res: Response, next: NextFunction): Response | undefined => {
    const { authorization } = req.headers;
    try {
      if (authorization !== undefined) {
        const token = authorization.split(' ').pop();
        const payload = userService.verifyJwt(String(token));
        if (payload.roles.includes(rol)) {
          //console.log(`Welcome ${rol}`);
          req.body.dataToken = payload;
          next();
          return undefined;
        } else {
          return httpResponse.unauthorized(res, `Only ${rol} on this endpoint`);
        }
      } else {
        return httpResponse.badRequest(res, 'Missing authorization headers');
      }
    } catch (error) {
      return httpResponse.unauthorized(res, error);
    }
  };
