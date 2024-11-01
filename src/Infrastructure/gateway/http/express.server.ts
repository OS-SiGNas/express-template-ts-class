import type { Server, IncomingMessage, ServerResponse } from 'node:http';
import type { Application, ErrorRequestHandler, RequestHandler } from 'express';
import type { Environment } from '../../../Domain/System.js';
import type { IServer } from '../../../Domain/IServer.js';
import type { ILogger } from '../../../Domain/core/ILogger.js';

interface Dependences {
  app: Application;
  port: number;
  host: string;
  environment: Environment;
  globalMiddlewares: RequestHandler[];
  apis: RequestHandler[][];
  lastMiddlewares: Array<RequestHandler | ErrorRequestHandler>;
  logger: ILogger;
}

export class ExpressServer implements IServer {
  #server?: Server<typeof IncomingMessage, typeof ServerResponse>;
  readonly #app: Application;
  readonly #port: number;
  readonly #logger: ILogger;
  readonly #environment: Environment;
  readonly #host: string;

  constructor(d: Dependences) {
    this.#environment = d.environment;
    this.#app = d.app;
    this.#port = d.port;
    this.#logger = d.logger;
    // init
    this.#app.use(d.globalMiddlewares);
    d.apis.forEach((api, i) => this.#app.use(`/v${i + 1}`, api));
    this.#app.use(d.lastMiddlewares);
  }

  public start = async (): Promise<void> => {
    if (this.#server !== undefined) return;
    const message = (): string => {
      if (this.#environment === 'development') return '👽 DEV MODE 👽';
      if (this.#environment === 'test') return '🕵️  TEST MODE 🪲';
      return '🔥 ON 🔥';
    };
    return new Promise((resolve) => {
      this.#server = this.#app.listen(this.#port, () => {
        this.#logger.info(`[!] Server ${this.#host}:${this.#port}\n[!] ${message()}`);
        resolve();
      });
    });
  };

  public readonly stop = (): void => {
    this.#server?.closeIdleConnections();
    this.#server = undefined;
    this.#logger.info('[!] Server stopped');
  };

  public readonly restart = async (): Promise<void> => {
    this.#logger.info('[!] Restarting');
    this.#server?.closeAllConnections();
    this.#server?.closeIdleConnections();
    this.#server?.close();
    this.#server = undefined;
    await this.start();
  };
}
