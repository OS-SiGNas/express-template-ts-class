import { Router } from 'express';

export const someone = Router().get('/someone', (_, res) => {
  res.status(204).send('someone');
});
