import { type Request, type Response, type NextFunction, type RequestHandler } from 'express';
import { type AnyZodObject, ZodError } from 'zod';
import { httpResponse } from './httpResponse';

export const schemaValidator =
  (schema: AnyZodObject): RequestHandler =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse({ body: req.body, params: req.params, query: req.query });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        httpResponse.badRequest(res, {
          errorMsg: error?.issues.map((issues) => ({
            errorType: issues.code,
            message: issues.message,
            path: issues.path,
          })),
        });
      } else {
        httpResponse.error(res, error);
      }
    }
  };
