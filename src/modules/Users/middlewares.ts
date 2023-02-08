import { type Request, type Response, type NextFunction } from 'express';
import { httpResponse } from '../Response/httpResponse';
import { userService } from './service';

export const checkSession = (req: Request, res: Response, next: NextFunction): Response | undefined => {
  const { authorization } = req.headers;
  try {
    if (authorization !== undefined) {
      const token = authorization.split(' ').pop();
      //console.log(token);
      const payload = userService.verifyJwt(String(token));
      req.body.dataToken = payload;
      next();
      return undefined;
    } else {
      return httpResponse.badRequest(res, 'Missing authorization headers');
    }
  } catch (error) {
    return httpResponse.unauthorized(res, error);
  }
};
