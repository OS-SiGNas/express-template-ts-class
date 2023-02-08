import Express, { type Application, json } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
// ->
import { type Config, users, saludo, poke } from '../index';

export class Server {
  #app: Application;
  #port: number;
  #dbUri: string;
  #debug: boolean;
  constructor(config: Config) {
    this.#app = Express();
    this.#port = config.getPort();
    this.#dbUri = config.getDbUri();
    this.#debug = config.getEnvironment() === 'DEV';
    this.#startMidlewares();
    this.#startModules();
  }

  #startMidlewares = (): void => {
    this.#app.use(this.#debug ? morgan('dev') : morgan('common'));
    this.#app.use(cors());
    this.#app.use(json());
    this.#app.use(cookieParser());
  };

  #startModules = (): void => {
    this.#app.use('/users', users);
    this.#app.use('/pokemons', poke);
    this.#app.use('/saludo', saludo);
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
