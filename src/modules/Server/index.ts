import Express, { Application, json } from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
// ->
import { auth, saludo, poke, templateObject, errorHandler } from "../index";

export class Server {
  #port: number;
  #express: Application;
  #debug: boolean;
  //#eventBus: boolean;

  constructor(port: number, debug: boolean = false) {
    this.#debug = debug;
    this.#port = port;
    this.#express = Express();
    this.#startMidlewares();
    this.#startModules();
  }

  #startMidlewares(): void {
    this.#express.use(this.#debug ? morgan("dev") : morgan("common"));
    this.#express.use(cors());
    this.#express.use(json());
    this.#express.use(cookieParser());
  }

  #startModules(): void {
    this.#express.use(auth);
    this.#express.use(saludo);
    this.#express.use(templateObject);
    this.#express.use(poke);

    //this.#express.use(api-v1);

    // TODO Extensible error handler
    this.#express.use(errorHandler);
  }

  public async run() {
    const message: string = this.#debug ? "👽 DEV MODE 👽" : "🔥 ON 🔥";
    return this.#express.listen(this.#port, (): void => {
      console.log(`\x1b[33m ${message}\x1b[0m`);
      console.log(`SERVER running on: http://localhost:${this.#port}`);
    });
  }
}
