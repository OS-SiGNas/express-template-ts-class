import { type User, UserModel } from './users_model';
import { type Config, config } from '../../Server/config';
import { type JwtPayload, sign, verify } from 'jsonwebtoken';
import { type Rol } from '../types';

interface Payload extends JwtPayload {
  username: string;
  roles: Rol[];
}

export class UserService {
  readonly #model: typeof UserModel;
  readonly #secretKey: string;
  constructor(model: typeof UserModel, config: Config) {
    this.#model = model;
    this.#secretKey = config.jwtSecretKey;
  }

  getUserbyUsername = async (username: string): Promise<User | undefined> => {
    const response = await this.#model.findOne({ username });
    if (response === null) return undefined;
    return response;
  };

  getUserById = async (_id: string): Promise<User | undefined> => {
    const response = await this.#model.findById({ _id });
    if (response === null) return undefined;
    return response;
  };

  getAllUsers = async (): Promise<User[]> => {
    const response = await this.#model.find();
    return response;
  };

  createUser = async (user: typeof UserModel): Promise<User> => {
    const newUser = new this.#model(user);
    await newUser.save();
    return newUser;
  };

  updateUserById = async (_id: string, data: any): Promise<User | undefined> => {
    const response: User | null = await this.#model.findByIdAndUpdate(_id, data, { new: true });
    if (response === null) return undefined;
    return response;
  };

  deleteUserById = async (_id: string): Promise<User | undefined> => {
    const response: User | null = await this.#model.findByIdAndDelete(_id);
    if (response === null) return undefined;
    return response;
  };

  generateJwt = (user: User): string => {
    const { _id, roles } = user;
    const payload = { _id, roles };
    const token = sign(payload, this.#secretKey, { expiresIn: 3600 });
    return token;
  };

  verifyJwt = (token: string): Payload => {
    const payload = <Payload | string>verify(token, this.#secretKey);
    if (typeof payload === 'string') throw new Error('Verify token failed');
    return payload;
  };

  checkUserAndPassword = async (username: string, password: string): Promise<User | undefined> => {
    const userMatched = await this.getUserbyUsername(username);
    if (userMatched === undefined) return undefined;
    if (userMatched.password !== password) return undefined;
    return userMatched;
  };
}

export const userService = new UserService(UserModel, config);
