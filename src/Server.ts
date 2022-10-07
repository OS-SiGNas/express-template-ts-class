import Express, { Application, json } from "express";
import morgan from "morgan";
import cors from "cors";

import { authRouter, saludoRouter, errorHandler } from "./modules";

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
    //this.#startDbConnection();
    this.#startMidlewares();
    this.#startModules();
  }

  //// TODO any connection DB method
  //async #startDbConnection() {
  //console.log(`DB connection handler is empty`);
  //}

  #startMidlewares() {
    this.#express.use(this.#debug ? morgan("dev") : morgan("common"));
    this.#express.use(cors());
    this.#express.use(json());
  }

  #startModules() {
    this.#express.use(authRouter);
    this.#express.use(saludoRouter);
    //this.#express.use(api-v1);
    //this.#express.use(api-v2);

    // TODO Extensible error handler
    this.#express.use(errorHandler);
  }

  run() {
    this.#debug
      ? console.log(`👽 Welcome to the escalable web service 👽
            🔥 DEV MODE 🔥`)
      : console.log("Normal Mode");
    this.#express.listen(this.#port, () => {
      console.log(`SERVER running on: ${this.#host}:${this.#port}`);
    });
  }
}
