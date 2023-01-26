import dotenv from "dotenv";

class Config {
  secretKey: string;
  port: number;
  dbURI: string;
  constructor() {
    dotenv.config();
    const { PORT, JWT_SECRET, MONGO_URI_HEADER, MONGO_PASS, MONGO_CLUSTER } = process.env;
    this.secretKey = String(JWT_SECRET);
    this.port = Number(PORT);
    this.dbURI = `${MONGO_URI_HEADER}${MONGO_PASS}${MONGO_CLUSTER}`;
  }
}

export const config: Config = new Config();
