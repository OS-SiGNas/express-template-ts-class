import Express from 'express';
import { SECRETS } from '../../../Domain/System.js';
import { ExpressServer } from './express.server.js';
import { globalMiddlewares, lastMiddlewares } from './middlewares/make.js';
import { Logger } from '../../../Applications/logger-handler/make.js';
import { v1 } from '../../../Applications/api-v1/index.js';

export const httpServer = new ExpressServer({
  app: Express(),
  host: SECRETS.THIS_URL,
  port: SECRETS.PORT,
  globalMiddlewares,
  apis: [v1 /*, v2 ,v3*/],
  lastMiddlewares,
  environment: SECRETS.NODE_ENV,
  logger: new Logger('ExpressServer'),
});
