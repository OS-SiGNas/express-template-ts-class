import { prop, getModelForClass } from '@typegoose/typegoose';
import { Types } from 'mongoose';

export class Note {
  @prop({ auto: true })
  _id: Types.ObjectId;

  @prop({ required: true })
  name: string;

  @prop({ required: true })
  content: string;

  @prop({ auto: true, required: true })
  createAt: Date;
}
