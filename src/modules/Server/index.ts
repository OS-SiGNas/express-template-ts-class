import Express, { type Application, json } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
// ->
import { config, auth, users, saludo, poke, templateObject } from '../index';

export class Server {
  #port: number;
  #express: Application;
  #dbUri: string;
  #debug: boolean;
  // #eventBus: boolean;

  constructor() {
    this.#express = Express();
    this.#port = config.getPort();
    this.#dbUri = config.getDbUri();
    this.#debug = config.getEnvironment();
    this.#startMidlewares();
    this.#startModules();
  }

  #startMidlewares(): void {
    this.#express.use(this.#debug ? morgan('dev') : morgan('common'));
    this.#express.use(cors());
    this.#express.use(json());
    this.#express.use(cookieParser());
  }

  #startModules(): void {
    this.#express.use(auth);
    this.#express.use(users);
    this.#express.use(saludo);
    this.#express.use(templateObject);
    this.#express.use(poke);

    // this.#express.use(api-v1);

    // TODO Extensible error handler
    // this.#express.use(errorHandler)
  }

  async #startDbConnection(): Promise<void> {
    mongoose.set('strictQuery', false);
    await mongoose.connect(this.#dbUri);
  }

  public async run(): Promise<void> {
    try {
      await this.#startDbConnection();
      this.#express.listen(this.#port, (): void => {
        const message = this.#debug ? '👽 DEV MODE 👽' : '🔥 ON 🔥';
        console.log(`\x1b[33m ${message}\x1b[0m\nSERVER running on: http://localhost:${this.#port}`);
      });
    } catch (error) {
      console.error(error);
    }
  }
}
