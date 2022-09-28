import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(`
    From 👉 ${req.url}
    Method 👉 ${req.method}
    Endpoint 👉 ${req.route}
    😡😠 Error 👉 ${err}
    🧐🧐 Error Message 👉 ${err.message}
  `);
  res.status(500).send(`Something wrong 👉 ${err.message}`);
  return next();
};
