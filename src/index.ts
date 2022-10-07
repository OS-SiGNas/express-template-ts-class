import Express, { Application, json } from "express";
import morgan from "morgan";
import cors from "cors";

import { authRouter, saludoRoutes } from "./modules";
import { errorHandler } from "./middlewares/errorHandler";

class Server {
  #host: string;
  #port: number;
  #app: Application;
  #debug: boolean;

  constructor(host: string, port: number, debug: boolean = false) {
    this.#debug = debug;
    this.#port = port;
    this.#host = host;
    this.#app = Express();
    this.#startDbConnection();
    this.#startMidlewares();
    this.#startModules();
  }

  // TODO any connection DB method
  async #startDbConnection() {
    console.log(`DB connection handler is empty`);
  }

  #startMidlewares() {
    this.#app.use(this.#debug ? morgan("dev") : morgan("common"));
    this.#app.use(cors());
    this.#app.use(json());

    //this.#app.use(urlencoded())
  }

  #startModules() {
    this.#app.use(authRouter);
    this.#app.use(saludoRoutes);

    // TODO Extensible error handler
    this.#app.use(errorHandler);
  }

  run() {
    this.#debug
      ? console.log(`👽 Welcome to the escalable web service 👽
            🔥 DEV MODE 🔥`)
      : console.log("Normal Mode");
    this.#app.listen(this.#port, () => {
      console.log(`SERVER running on: ${this.#host}:${this.#port}`);
    });
  }
}

// const server = new Server("http://localhost", 3333);
const server: Server = new Server("http://localhost", 3333, true);
server.run();
