import Express, { Application, json } from "express";
import morgan from "morgan";
import cors from "cors";

import { auth, checkSession, saludo, errorHandler } from "./modules";

export class Server {
  #host: string;
  #port: number;
  #express: Application;
  #debug: boolean;

  constructor(host: string, port: number, debug: boolean = false) {
    this.#debug = debug;
    this.#port = port;
    this.#host = host;
    this.#express = Express();
    this.#startMidlewares();
    this.#startModules();
  }

  #startMidlewares(): void {
    this.#express.use(this.#debug ? morgan("dev") : morgan("common"));
    this.#express.use(cors());
    this.#express.use(json());
    this.#express.use(checkSession);
  }

  #startModules(): void {
    this.#express.use(auth);
    this.#express.use(saludo);
    //this.#express.use(api-v1);
    //this.#express.use(api-v2);

    // TODO Extensible error handler
    this.#express.use(errorHandler);
  }

  run() {
    return this.#express.listen(this.#port, () => {
      console.log(`SERVER running on: ${this.#host}:${this.#port}`);
      this.#debug
        ? console.log(`🔥 DEV MODE 🔥 Welcome to the escalable web service 👽`)
        : console.log("🔥 ON 🔥");
    });
  }
}
