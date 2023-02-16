import { ErrorRequestHandler } from 'express';
import { httpResponse } from '../shared/httpResponse';

export const errorHandler: ErrorRequestHandler = (error, req, res, _next) => {
  const log = { method: req.method, url: req.url, error };
  httpResponse.error(res, log);
};
