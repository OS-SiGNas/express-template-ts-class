import { ErrorRequestHandler } from 'express';
import { httpResponse } from '../shared/httpResponse';

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  httpResponse.error(res, error);
};
