import { Router, type Request, type Response } from 'express';
import { httpResponse } from '../HttpResponse';

export const notFound: Router = Router();
notFound.get('/404', (_req: Request, res: Response) => {
  return httpResponse.notFound(res);
});
