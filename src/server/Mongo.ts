import type { Mongoose } from 'mongoose';
import type { DatabaseHandler, Environment } from './types';

export default class Mongo implements DatabaseHandler {
  readonly #uri: string;
  readonly #mongoose: Mongoose;
  constructor(mongoose: Mongoose, uri: string, environment: Environment) {
    this.#mongoose = mongoose;
    this.#uri = uri;
    if (environment === 'dev') this.#devEvents();
    this.#mongoose.connection.on('error', this.#isError);
  }

  public connect = async (): Promise<void> => {
    this.#mongoose.set('strictQuery', false);
    await this.#mongoose.connect(this.#uri);
  };

  #devEvents = (): void => {
    this.#mongoose.connection.on('connecting', this.#isConnecting);
    this.#mongoose.connection.on('connected', this.#isConnected);
    this.#mongoose.connection.on('reconnected', this.#isReconnected);
    this.#mongoose.connection.on('close', this.#isClose);
  };

  #isConnecting = (): void => {
    console.log('==> Connecting to mongo cluster...');
  };

  #isConnected = (): void => {
    console.log('==> Mongo cluster connected');
  };

  #isReconnected = (): void => {
    console.log('==> Reconnected to mongo cluster...');
  };

  #isError = (): void => {
    console.log('==> Connection error');
  };

  #isClose = (): void => {
    console.log('==> Mongo connection is closed ');
  };
}
