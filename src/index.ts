import { exit } from 'node:process';
import { servers } from './Infrastructure/index.js';

import type { IServer } from './Domain/IServer';

void (async (servers: IServer[]): Promise<void> => {
  try {
    for (const server of servers) await server.start();
  } catch (error) {
    console.trace(error);
    for (const server of servers) server.stop();
    exit(1);
  }
})(servers);
