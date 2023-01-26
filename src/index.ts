import { Server } from "./modules";
import { config } from "./modules/Config";

const server = new Server(config.port, false);
server.run();
