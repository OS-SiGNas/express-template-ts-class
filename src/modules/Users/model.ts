import { prop, getModelForClass } from '@typegoose/typegoose'
import { type Rol } from '../../types'

export class User {
  @prop({ required: true })
    username: string

  @prop({ required: true, minlength: 8 })
    password: string

  @prop({ required: true, trim: true })
    email: string

  @prop({ required: true })
    name: string

  @prop({ required: true })
    telf: string

  @prop({ required: true })
    active: boolean

  @prop({ required: true })
    rol: Rol[]
}

export const UserModel = getModelForClass(User)
