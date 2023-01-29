import { type Request, type Response, type NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { config } from '../Config';

export const checkSession = (req: Request, res: Response, next: NextFunction): Response | undefined => {
  const { authorization } = req.headers;
  if (authorization === undefined) return res.sendStatus(403);
  const token = String(authorization.split(' ').pop());
  try {
    const payload = verify(token, config.getJwtSecretKey());
    req.body.dataToken = payload;
    next();
    return undefined;
  } catch (error: any) {
    if (error.message === 'invalid signatured') return res.status(401).json({ error });
    return res.status(400).json({ error });
  }
};
