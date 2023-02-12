import { type Request, type Response, type NextFunction, type RequestHandler } from 'express';
import { httpResponse } from '../HttpResponse';
import { z, ZodError } from 'zod';

const loginSchema = z.object({
  username: z.string(),
  password: z.string().min(10, 'Password need 10 chars'),
});

export const loginValidator: RequestHandler = (req: Request, res: Response, next: NextFunction): void | Response => {
  try {
    loginSchema.parse(req.body);
    return next();
  } catch (error) {
    if (error instanceof ZodError) {
      return httpResponse.badRequest(res, {
        errorMsg: error?.issues.map((issues) => ({
          errorType: issues.code,
          path: issues.path[0],
          message: issues.message,
        })),
      });
    } else {
      return httpResponse.error(res, error);
    }
  }
};

// -------------------------------------------------------------------------------------------------------------------------
const userSchema = z.object({
  username: z.string(),
  password: z.string(),
  email: z.string().email(),
  name: z.string(),
  telf: z.string(),
  active: z.boolean(),
  rol: z.array(z.enum(['admin', 'dev', 'audit', 'user'])),
});

export const userModelValidator: RequestHandler = (req: Request, res: Response, next: NextFunction): void | Response => {
  try {
    userSchema.parse(req.body);
    return next();
  } catch (error) {
    if (error instanceof ZodError) {
      return httpResponse.badRequest(res, {
        errorMsg: error?.issues.map((issues) => ({
          errorType: issues.code,
          path: issues.path[0],
          message: issues.message,
        })),
      });
    } else {
      return httpResponse.error(res, error);
    }
  }
};
