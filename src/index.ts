import { Server } from './Server';
import { config } from './Server/config';
import { modules } from './modules';

void (async (server = new Server(config, modules)): Promise<void> => {
  await server.run();
})();
