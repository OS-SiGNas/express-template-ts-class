import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const { MONGO_PASS, MONGO_URI_HEADER, MONGO_CLUSTER } = process.env;
//console.log(`=> ${MONGO_URI_HEADER}${MONGO_PASS}${MONGO_CLUSTER}`);
const uri = `${MONGO_URI_HEADER}${MONGO_PASS}${MONGO_CLUSTER}`;
//const options = {};
const usersWarehouse = async () => {
  try {
    const conn = await mongoose.connect(uri);
    console.log("COOONEEEECTT");
    return conn;
  } catch (error) {
    console.error(`Ups! 👉 ${error.message}`);
  }
};

export { usersWarehouse };
