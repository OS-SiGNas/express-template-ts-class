import { prop, getModelForClass } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { type Rol } from '../types';

export class User {
  // =>
  @prop({ auto: true })
  _id: Types.ObjectId;

  @prop({ required: true })
  username: string;

  @prop({ required: true, minlength: 8 })
  password: string;

  @prop({ required: true, trim: true })
  email: string;

  @prop({ required: true })
  name: string;

  @prop({ required: true })
  telf: string;

  @prop({ required: true })
  active: boolean;

  @prop({ type: String, required: true, default: [] })
  roles: Types.Array<Rol>;
}

export const UserModel = getModelForClass(User);
