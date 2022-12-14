import Express, { Application, json } from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
// ->
import { auth, saludo, templateObject, errorHandler } from "./modules";

export class Server {
  #host: string;
  #port: number;
  #express: Application;
  #debug: boolean;
  //#eventBus: boolean;

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
    this.#express.use(cookieParser());
  }

  #startModules(): void {
    this.#express.use(auth);
    this.#express.use(saludo);
    this.#express.use(templateObject);

    //this.#express.use(api-v1);

    // TODO Extensible error handler
    this.#express.use(errorHandler);
  }

  run() {
    return this.#express.listen(this.#port, () => {
      this.#debug
        ? console.log("👽 Welcome to the escalable web service\n🔥 DEV MODE 🔥")
        : console.log("🔥 ON 🔥");
      console.log(`SERVER running on: ${this.#host}:${this.#port}`);
    });
  }
}
