import { Schema, model } from "mongoose";
import { IUser } from "../../types";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    min: 4,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    min: 4,
    lowercase: true,
  },
  name: {
    type: String,
    lowercase: true,
    required: true,
  },
  telf: {
    type: String,
    required: true,
  },
  active: Boolean,
  registered: String,
  rol: Array<String>,
});

export default model<IUser>("User", userSchema);
