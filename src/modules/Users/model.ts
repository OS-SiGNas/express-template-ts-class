import { Schema } from "mongoose";

export interface User {
  id: number;
  username: string;
  password: string;
  name: string;
  telf: string;
  email: string;
  active: boolean;
  registered: string;
  rol: string[];
}

export const User = new Schema({
  id: Number,
  username: String,
  password: String,
  name: String,
  telf: String,
  email: String,
  active: Boolean,
  registered: String,
  rol: Array<String>,
});
