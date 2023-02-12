import Express, { type Application, type Router, json } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import { errorHandler } from '../modules/ErrorHandler';
import { type Config } from './config';

export class Server {
  readonly #app: Application;
  readonly #port: number;
  readonly #dbUri: string;
  readonly #debug: boolean;
  constructor(config: Config, modules: Array<Router>) {
    this.#app = Express();
    this.#port = config.port;
    this.#dbUri = config.dbUri;
    this.#debug = config.environment === 'dev';
    // =>
    this.#startGlobalMidlewares();
    this.#app.use(modules);
    this.#app.use(errorHandler);
  }

  #startGlobalMidlewares = (): void => {
    this.#app
      .use(this.#debug ? morgan('dev') : morgan('common'))
      .use(cors())
      .use(json())
      .use(cookieParser());
  };

  #startDbConnection = async (): Promise<void> => {
    mongoose.set('strictQuery', false);
    await mongoose.connect(this.#dbUri);
  };

  public run = async (): Promise<void> => {
    try {
      await this.#startDbConnection();
      this.#app.listen(this.#port, (): void => {
        const message = this.#debug ? '👽 DEV MODE 👽' : '🔥 ON 🔥';
        console.info(`\x1b[33m ${message}\x1b[0m\nSERVER running on: http://localhost:${this.#port}`);
      });
    } catch (error) {
      console.error(error);
    }
  };
}
