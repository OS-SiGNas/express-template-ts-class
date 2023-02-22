import Express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { set, connect } from 'mongoose';

// types
import type { Application } from 'express';
import type { Modules } from '../modules/types';
import type { Config } from './config';

export class Server {
  readonly #app: Application;
  readonly #port: number;
  readonly #dbUri: string;
  readonly #debug: boolean;
  constructor(config: Config, modules: Modules) {
    this.#app = Express();
    this.#port = config.port;
    this.#dbUri = config.dbUri;
    this.#debug = config.environment === 'dev';

    this.#init(modules);
  }

  get app(): Application {
    return this.#app;
  }

  readonly #startMongoConnection = async (): Promise<void> => {
    set('strictQuery', false);
    await connect(this.#dbUri);
  };

  readonly #startGlobalMidlewares = (): void => {
    this.#app
      .use(this.#debug ? morgan('dev') : morgan('common'))
      .use(Express.json())
      .use(cors());
  };

  readonly #init = (modules: Modules): void => {
    this.#startGlobalMidlewares();
    this.#app.use(modules);
  };

  public run = async (): Promise<void> => {
    try {
      await this.#startMongoConnection();
      this.#app.listen(this.#port, (): void => {
        const message = this.#debug ? '👽 DEV MODE 👽' : '🔥 ON 🔥';
        console.info(`\x1b[33m ${message}\x1b[0m\nSERVER running on: http://localhost:${this.#port}`);
      });
    } catch (error) {
      console.error(error);
    }
  };
}
