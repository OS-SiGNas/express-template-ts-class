import { type Request, type Response, type NextFunction, type RequestHandler } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { httpResponse } from '../HttpResponse';

export const schemaValidator =
  (schema: AnyZodObject): RequestHandler =>
  (req: Request, res: Response, next: NextFunction): void | Response => {
    try {
      schema.parse({ body: req.body, params: req.params, query: req.query });
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
