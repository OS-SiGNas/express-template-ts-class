import { Server } from './Server';
import { config } from './Server/config';
import { modules } from './modules';

((server = new Server(config, modules)): void => {
  server.run().catch((error) => {
    console.error(error);
  });
})();
