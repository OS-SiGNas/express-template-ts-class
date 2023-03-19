import type { Application, RequestHandler } from 'express';
import type { Modules } from '../modules/types';
import type { IServer, DatabaseHandler } from './types';
interface Dependences {
  environment: 'dev' | 'test' | 'prod';
  app: Application;
  port: number;
  mongo: DatabaseHandler;
  middlewares: RequestHandler[];
  modules: Modules;
}

export default class Server implements IServer {
  readonly #app: Application;
  readonly #port: number;
  readonly #mongo: DatabaseHandler;
  readonly #environment: string;
  constructor({ environment, app, port, mongo, middlewares, modules }: Dependences) {
    this.#environment = environment;
    this.#app = app;
    this.#port = port;
    this.#mongo = mongo;
    // init
    this.#app.use(middlewares);
    this.#app.use(modules);
  }

  #message = (): string => {
    if (this.#environment === 'dev') return '👽 DEV MODE 👽';
    if (this.#environment === 'test') return '🕵️  TEST MODE 🪲';
    return '🔥 ON 🔥';
  };

  public run = async (): Promise<void> => {
    const { port } = this.#app.listen(this.#port).address() as { port: number };
    console.info(`\x1b[33m${this.#message()}\x1b[0m\nSERVER running on: http://localhost:${port}`);
    try {
      await this.#mongo.connect();
    } catch (error) {
      console.error(error);
    }
  };

  public get app(): Application | undefined {
    if (this.#environment === 'test') return this.#app;
    return undefined;
  }
}
