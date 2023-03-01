import { Server } from './Server';
import { config } from './Server/config';
import { modules } from './modules';

const server = new Server(config, modules);

void (async (server: Server): Promise<void> => {
  await server.run();
})(server);

// if environment is different than 'test' server.app will return undefined
export default server.app;
