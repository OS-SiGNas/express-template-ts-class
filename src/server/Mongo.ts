import type { Mongoose } from 'mongoose';
import type { DatabaseHandler } from './types';

export default class Mongo implements DatabaseHandler {
  #uri: string;
  #mongoose: Mongoose;
  constructor(mongoose: Mongoose, uri: string) {
    this.#mongoose = mongoose;
    this.#uri = uri;
    this.#events();
  }

  connect = async (): Promise<void> => {
    this.#mongoose.set('strictQuery', false);
    await this.#mongoose.connect(this.#uri);
  };

  #events = (): void => {
    this.#mongoose.connection.on('connecting', this.#isConnecting);
    this.#mongoose.connection.on('connected', this.#isConnected);
    this.#mongoose.connection.on('reconnected', this.#isReconnected);
    this.#mongoose.connection.on('close', this.#isClose);
    this.#mongoose.connection.on('error', this.#isError);
  };

  #isConnected = (): void => {
    console.log('==> Mongo cluster connected');
  };

  #isConnecting = (): void => {
    console.log('==> Connecting to mongo cluster...');
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

/*
connecting: Emitted when Mongoose starts making its initial connection to the MongoDB server
connected: Emitted when Mongoose successfully makes its initial connection to the MongoDB server, or when Mongoose reconnects after losing connectivity. May be emitted multiple times if Mongoose loses connectivity.
open: Emitted after 'connected' and onOpen is executed on all of this connection's models.
disconnecting: Your app called Connection#close() to disconnect from MongoDB
disconnected: Emitted when Mongoose lost connection to the MongoDB server. This event may be due to your code explicitly closing the connection, the database server crashing, or network connectivity issues.
close: Emitted after Connection#close() successfully closes the connection. If you call conn.close(), you'll get both a 'disconnected' event and a 'close' event.
reconnected: Emitted if Mongoose lost connectivity to MongoDB and successfully reconnected. Mongoose attempts to automatically reconnect when it loses connection to the database.
error: Emitted if an error occurs on a connection, like a parseError due to malformed data or a payload larger than 16MB.
fullsetup: Emitted when you're connecting to a replica set and Mongoose has successfully connected to the primary and at least one secondary.
all: Emitted when you're connecting to a replica set and Mongoose has successfully connected to all servers specified in your connection string.
*/
