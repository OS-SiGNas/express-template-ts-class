import mongoose from "mongoose";
import { config } from "../Config";

export const usersWarehouse = async () => {
  try {
    const conn = await mongoose.connect(config.dbURI);
    console.log("COOONEEEECTT");
    return conn;
  } catch (error) {
    return console.error(error);
  }
};
