import dotenv from 'dotenv';

export class Config {
  readonly #secretKey: string;
  readonly #port: number;
  readonly #dbURI: string;
  readonly #apiSaludo: string;
  readonly #environment: string;

  constructor() {
    dotenv.config();
    const { NODE_ENV, PORT, JWT_SECRET, MONGO_URI_HEADER, MONGO_PASS, MONGO_CLUSTER, API_SALUDO } = process.env;
    this.#environment = String(NODE_ENV);
    this.#port = Number(PORT);
    this.#secretKey = String(JWT_SECRET);
    this.#apiSaludo = String(API_SALUDO);
    this.#dbURI = `${String(MONGO_URI_HEADER)}${String(MONGO_PASS)}${String(MONGO_CLUSTER)}`;
  }

  get jwtSecretKey(): string {
    return this.#secretKey;
  }

  get dbUri(): string {
    return this.#dbURI;
  }

  get apiSAludo(): string {
    return this.#apiSaludo;
  }

  get port(): number {
    return this.#port;
  }

  get environment(): string {
    return this.#environment;
  }
}

export const config: Config = new Config();
