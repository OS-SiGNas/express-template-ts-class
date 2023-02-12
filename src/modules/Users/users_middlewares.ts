import { type Request, type Response, type NextFunction } from 'express';
import { httpResponse } from '../HttpResponse';
import { userService } from './users_service';

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
      console.log('here');
      return httpResponse.badRequest(res, 'Missing authorization headers');
    }
  } catch (error) {
    return httpResponse.unauthorized(res, error);
  }
};
