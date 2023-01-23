import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  password: string;
  name: string;
  telf: string;
  email: string;
  active: boolean;
  registered: string;
  rol: Array<String>;
}

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
