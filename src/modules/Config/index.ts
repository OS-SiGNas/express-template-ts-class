import dotenv from "dotenv";
dotenv.config();
const { PORT, JWT_SECRET, MONGO_PASS, MONGO_URI_HEADER, MONGO_CLUSTER } =
  process.env;

type Config = {
  secretKey: string;
  port: number;
  host: string;
  dbPass: string;
  dbURI: string;
};

export const config: Config = {
  secretKey: String(JWT_SECRET),
  port: Number(PORT) || 3000,
  host: "http://localhost",
  dbPass: String(MONGO_PASS),
  dbURI: `${MONGO_URI_HEADER}${MONGO_CLUSTER}`,
};

//console.log(typeof config.secretKey);
