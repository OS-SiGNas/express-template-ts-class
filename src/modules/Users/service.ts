import { type User, UserModel } from './model';
import { config } from '../Config';
import { JwtPayload, sign, verify } from 'jsonwebtoken';

export class UserService {
  #model: typeof UserModel;
  constructor(model: typeof UserModel) {
    this.#model = model;
  }

  getUserbyUsername = async (username: string): Promise<User | undefined> => {
    const response = await this.#model.findOne({ username }, ['username', 'password']);
    if (response === null) return undefined;
    return response;
  };

  getUserById = async (_id: string): Promise<User | undefined> => {
    const response = await this.#model.findById({ _id });
    if (response === null) return undefined;
    console.log(response);
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

  deleteUserById = async (id: string): Promise<User | undefined> => {
    const response: User | null = await this.#model.findByIdAndDelete(id);
    if (response === null) return undefined;
    return response;
  };

  generateJwt = (user: User): string => {
    const { username, rol } = user;
    const payload = { username, rol };
    const token = sign(payload, config.getJwtSecretKey(), { expiresIn: 3600 });
    return token;
  };

  verifyJwt = (token: string): JwtPayload | string => {
    return verify(token, config.getJwtSecretKey());
  };

  checkUserAndPassword = async (username: string, password: string): Promise<User | undefined> => {
    const userMatched = await this.getUserbyUsername(username);
    if (userMatched === undefined) return undefined;
    if (userMatched.password !== password) return undefined;
    return userMatched;
  };
}

export const userService = new UserService(UserModel);
