import { Server } from "./Server";

const host = `http://localhost`;
const port = 3333;

const server: Server = new Server(host, port, true);

server.run();
