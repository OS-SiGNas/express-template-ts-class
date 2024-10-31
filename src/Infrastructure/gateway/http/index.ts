import Express from 'express';
import { SECRETS } from '../../../Domain/System.js';
import { ExpressServer } from './express.server.js';
import { globalMiddlewares, lastMiddlewares } from './middlewares/make.js';
import { Logger } from '../../../Applications/shared/logger-handler/console.logger.js';

export const httpServer = new ExpressServer({
  app: Express(),
  environment: SECRETS.NODE_ENV,
  globalMiddlewares,
  lastMiddlewares,
  port: SECRETS.PORT,
  routers: [],
  logger: new Logger('ExpressServer'),
});
