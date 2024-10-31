import type { AddressInfo } from 'node:net';
import type { Application, ErrorRequestHandler, RequestHandler } from 'express';
import type { Environment } from '../../../Domain/System.js';
import type { IServer } from '../../../Domain/IServer.js';
import type { ILogger } from '../../../Domain/core/ILogger.js';

interface Dependences {
  app: Application;
  port: number;
  environment: Environment;
  globalMiddlewares: RequestHandler[];
  routers: RequestHandler[];
  lastMiddlewares: Array<RequestHandler | ErrorRequestHandler>;
  logger: ILogger;
}

export class ExpressServer implements IServer {
  readonly #app: Application;
  readonly #environment: Environment;
  readonly #port: number;
  readonly #logger: ILogger;
  constructor(d: Dependences) {
    this.#environment = d.environment;
    this.#app = d.app;
    this.#port = d.port;
    this.#logger = d.logger;
    // init
    this.#app.use(d.globalMiddlewares);
    // this.#app.use(d.routers);
    this.#app.use(d.lastMiddlewares);
  }

  public start = async (): Promise<void> => {
    return new Promise((resolve) => {
      const { port } = this.#app
        .listen(this.#port, () => {
          console.info(`Listen on: ${port}`);
          this.#message();
          resolve();
        })
        .address() as AddressInfo;
    });
  };

  #message = (): string => {
    if (this.#environment === 'development') return '👽 DEV MODE 👽';
    if (this.#environment === 'test') return '🕵️  TEST MODE 🪲';
    return '🔥 ON 🔥';
  };

  public readonly stop = (): void => {
    this.#logger.info(`Stopping`);
  };

  public readonly restart = async (): Promise<void> => {
    this.#logger.info('Restarting');
    await this.start();
  };
}
