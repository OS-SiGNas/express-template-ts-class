import dotenv from 'dotenv';
dotenv.config();
const {
  NODE_ENV,
  PORT,
  JWT_SECRET,
  MONGO_URI_HEADER,
  MONGO_PASS,
  MONGO_CLUSTER,
  API_SALUDO,
  USER_TEST_USERNAME,
  USER_TEST_PASSWORD,
} = process.env;

export class Config {
  readonly #environment: string;
  readonly #port: number;
  readonly #dbURI: string;
  readonly #secretKey: string;
  readonly #apiSaludo: string;
  readonly #userTestData: { username: string; password: string } | undefined;

  constructor() {
    this.#environment = String(NODE_ENV);
    this.#port = PORT === undefined ? 3000 : Number(PORT);
    this.#dbURI = `${String(MONGO_URI_HEADER)}${String(MONGO_PASS)}${String(MONGO_CLUSTER)}`;
    this.#secretKey = String(JWT_SECRET);
    this.#apiSaludo = String(API_SALUDO);
    if (USER_TEST_USERNAME !== undefined && USER_TEST_PASSWORD !== undefined) {
      this.#userTestData = { username: USER_TEST_USERNAME, password: USER_TEST_PASSWORD };
    } else {
      this.#userTestData = undefined;
    }
  }

  get environment(): string {
    return this.#environment;
  }

  get port(): number {
    return this.#port;
  }

  get dbUri(): string {
    return this.#dbURI;
  }

  get jwtSecretKey(): string {
    return this.#secretKey;
  }

  get apiSAludo(): string {
    return this.#apiSaludo;
  }

  get testUserData(): { username: string; password: string } | undefined {
    if (this.#environment === 'test') return this.#userTestData;
    return undefined;
  }
}

export const config: Config = new Config();
