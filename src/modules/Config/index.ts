import dotenv from 'dotenv';

export class Config {
  #secretKey: string;
  #port: number;
  #dbURI: string;
  #apiSaludo: string;
  #environment: string;

  constructor() {
    dotenv.config();
    const { NODE_ENV, PORT, JWT_SECRET, MONGO_URI_HEADER, MONGO_PASS, MONGO_CLUSTER, API_SALUDO } = process.env;
    this.#environment = String(NODE_ENV);
    this.#port = Number(PORT);
    this.#secretKey = String(JWT_SECRET);
    this.#apiSaludo = String(API_SALUDO);
    this.#dbURI = `${MONGO_URI_HEADER}${MONGO_PASS}${MONGO_CLUSTER}`;
  }

  public getJwtSecretKey = (): string => {
    return this.#secretKey;
  };

  public getDbUri = (): string => {
    return this.#dbURI;
  };

  public getApiSAludo = (): string => {
    return this.#apiSaludo;
  };

  public getPort = (): number => {
    return this.#port;
  };

  public getEnvironment = (): string => {
    return this.#environment;
  };
}

export const config: Config = new Config();
