import { type ErrorRequestHandler } from 'express';
import { httpResponse } from '../shared/httpResponse';

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log('ErrorHandler 🪲', { url: req.url, method: req.method });
  httpResponse.error(res, error);
  next();
};
