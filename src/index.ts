import { Server } from './Server';
import { config } from './Server/config';
import { modules } from './modules';

const server = new Server(config, modules);
server.run();
