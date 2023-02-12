import { ErrorRequestHandler } from 'express';
import { httpResponse } from '../HttpResponse';

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  httpResponse.error(res, error);
};
