import { env, loadEnvFile } from 'node:process';
import { Logger } from '../Applications/logger-handler/make.js';

export type Environment = 'development' | 'production' | 'test';
export type HttpService = 'express' | 'fastify';
export type LoggerService = 'console' | 'winston';

interface Secrets {
  NODE_ENV: Environment;
  THIS_URL: string;
  PORT: number;
  MONGO_URI: string;
  JWT_ACCESS_SECRET_KEY: string;
  JWT_ACCESS_EXPIRED_TIME: string;
  JWT_REFRESH_SECRET_KEY: string;
  JWT_REFRESH_EXPIRED_TIME: string;
  JWT_AA_SECRET_KEY: string;
  JWT_AA_EXPIRED_TIME: string;
}

class System {
  private constructor() {}
  static #instance?: System; // crazy singleton 🤡
  static get instance(): Readonly<System> {
    return (this.#instance ??= new System());
  }

  readonly #logger = new Logger(this.constructor.name);

  readonly #error = (variable: keyof Secrets): Error => {
    this.#logger.error(`x ${variable}`);
    return new Error(`Environment Variable: \x1B[31m${variable}\x1B[39m is undefined 💩`);
  };

  readonly #getSecretFromDotEnv = (target: keyof Secrets): Readonly<string> => {
    const variable = env[target];
    if (variable === undefined) throw this.#error(target);
    this.#logger.debug(`✓ ${target}`);
    return variable;
  };

  public get SECRETS(): Readonly<Secrets> {
    this.#logger.info('Loading secrets');
    return {
      NODE_ENV: this.#getSecretFromDotEnv('NODE_ENV') as Environment,
      THIS_URL: this.#getSecretFromDotEnv('THIS_URL'),
      PORT: +this.#getSecretFromDotEnv('PORT'),
      MONGO_URI: this.#getSecretFromDotEnv('MONGO_URI'),
      JWT_ACCESS_SECRET_KEY: this.#getSecretFromDotEnv('JWT_ACCESS_SECRET_KEY'),
      JWT_ACCESS_EXPIRED_TIME: this.#getSecretFromDotEnv('JWT_ACCESS_EXPIRED_TIME'),
      JWT_REFRESH_SECRET_KEY: this.#getSecretFromDotEnv('JWT_REFRESH_SECRET_KEY'),
      JWT_REFRESH_EXPIRED_TIME: this.#getSecretFromDotEnv('JWT_REFRESH_EXPIRED_TIME'),
      JWT_AA_SECRET_KEY: this.#getSecretFromDotEnv('JWT_AA_SECRET_KEY'),
      JWT_AA_EXPIRED_TIME: this.#getSecretFromDotEnv('JWT_AA_EXPIRED_TIME'),
    } as const;
  }

  #cacheSecrets?: Secrets;
  public readonly getAsyncSecrets = async (): Promise<Readonly<Secrets>> => {
    if (this.#cacheSecrets === undefined) {
      /** Implement async handle secrets service
      const strategy = this.#getAsyncSecretStrategy('AWS')
      this.#cacheSecrets = await strategy() */
      this.#cacheSecrets = this.SECRETS;
    }

    return await Promise.resolve(this.#cacheSecrets);
  };

  get isDebug(): boolean {
    return SECRETS.NODE_ENV !== 'production';
  }
}

loadEnvFile(env.NODE_ENV !== 'production' ? '.env.dev' : '.env');
export const { SECRETS, getAsyncSecrets, isDebug } = System.instance;
