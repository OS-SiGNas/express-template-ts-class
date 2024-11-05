import { exit } from 'node:process';
import { styleText } from 'node:util';
import { servers } from './Infrastructure/index.js';

import type { IServer } from './Domain/IServer';

void (async (servers: IServer[]): Promise<void> => {
  const leaving = () => {
    console.info(styleText(['red', 'bold'], '\n\n[!] Leaving'));
    exit(1);
  };

  process.on('SIGINT', leaving);

  try {
    for (const server of servers) await server.start();
  } catch (error) {
    console.trace(error);
    for (const server of servers) server.stop();
    leaving();
  }
})(servers);
