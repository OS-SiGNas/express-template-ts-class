import { UserModel } from './users_model';
import { config } from '../../Server/config';
import { sign, verify } from 'jsonwebtoken';

// types
import type { JwtPayload } from 'jsonwebtoken';
import type { User } from './users_model';
import type { Rol } from '../types';

interface Payload extends JwtPayload {
  username: string;
  roles: Rol[];
}

export class UserService {
  readonly #model: typeof UserModel;
  readonly #secretKey: string;
  constructor(model: typeof UserModel, jwtSecretKey: string) {
    this.#model = model;
    this.#secretKey = jwtSecretKey;
  }

  getUserbyUsername = async (username: string): Promise<User | null> => {
    return await this.#model.findOne({ username });
  };

  getUserById = async (_id: string): Promise<User | null> => {
    return await this.#model.findById({ _id });
  };

  getAllUsers = async (): Promise<User[]> => {
    return await this.#model.find();
  };

  createUser = async (user: User): Promise<User> => {
    const encryptedPassword = await this.#model.encryptPassword(user.password);
    const newUser = new this.#model({ ...user, password: encryptedPassword });
    return await newUser.save();
  };

  updateUserById = async (_id: string, user: User): Promise<User | null> => {
    // TODO: test
    if (user.password !== undefined) {
      const passwordEncrypted = await this.#model.encryptPassword(user.password);
      user.password = passwordEncrypted;
    }
    return await this.#model.findByIdAndUpdate(_id, user, { new: true });
  };

  deleteUserById = async (_id: string): Promise<User | null> => {
    return await this.#model.findByIdAndDelete(_id);
  };

  generateJwt = (user: User): string => {
    const { _id, roles } = user;
    const payload = { _id, roles };
    const token = sign(payload, this.#secretKey, { expiresIn: 3600 });
    return token;
  };

  verifyJwt = (token: string): Payload => {
    // TODO: test Login
    const payload = verify(token, this.#secretKey) as Payload | string;
    if (typeof payload === 'string') throw new Error('Verify token failed');
    return payload;
  };

  checkUserAndPassword = async (username: string, password: string): Promise<User | null> => {
    const userMatched = await this.getUserbyUsername(username);
    if (userMatched === null) return null;
    // if (userMatched.password !== password) return null;
    const equals = await this.#model.comparePassword(password, userMatched.password);
    if (!equals) return null;
    return userMatched;
  };
}

export const userService = new UserService(UserModel, config.jwtSecretKey);
