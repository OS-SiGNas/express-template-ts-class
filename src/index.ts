import { Server } from "./modules/Server";
import dotenv from "dotenv";

dotenv.config();

const port = Number(process.env.PORT || 3000);
const host = `http://localhost`;

const server = new Server(host, port, true);
server.run();
