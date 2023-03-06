import Express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { set, connect } from 'mongoose';
import config from './config';
import modules from './modules';

// types
import type { Application } from 'express';
import type { Config } from './config';
import type { Modules } from './modules/types';

export class Server {
  readonly #app: Application;
  readonly #port: number;
  readonly #dbUri: string;
  readonly #environment: string;
  constructor(config: Config, modules: Modules) {
    this.#app = Express();
    this.#port = config.port;
    this.#dbUri = config.dbUri;
    this.#environment = config.environment;

    // init main method
    this.#init(modules);
  }

  readonly #startMongoConnection = async (): Promise<void> => {
    set('strictQuery', false);
    await connect(this.#dbUri);
  };

  readonly #startGlobalMidlewares = (): void => {
    this.#app
      .use(this.#environment === 'dev' ? morgan('dev') : morgan('common'))
      .use(Express.json())
      .use(cors());
  };

  readonly #init = (modules: Modules): void => {
    this.#startGlobalMidlewares();
    this.#app.use(modules);
  };

  public readonly run = async (): Promise<void> => {
    const message = (): string => {
      if (this.#environment === 'prod') return '🔥 ON 🔥';
      if (this.#environment === 'dev') return '👽 DEV MODE 👽';
      if (this.#environment === 'test') return '🕵️ TEST MODE 🪲';
      return '';
    };

    this.#app.listen(this.#port, (): void => {
      console.info(`\x1b[33m ${message()}\x1b[0m\nSERVER running on: http://localhost:${this.#port}`);
    });

    try {
      await this.#startMongoConnection();
    } catch (error) {
      console.error(error);
    }
  };

  public get app(): Application | undefined {
    if (this.#environment === 'test') return this.#app;
    return undefined;
  }
} // <- end

export default new Server(config, modules);

