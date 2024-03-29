import type UsersModel from './UsersModel';
import type { IUserService, IUser } from '../types';

export default class UsersService implements IUserService {
  readonly #model: typeof UsersModel;
  constructor(model: typeof UsersModel) {
    this.#model = model;
  }

  public checkUserAndPassword = async (username: string, password: string): Promise<IUser | null> => {
    const userMatched = await this.getUserbyUsername(username);
    if (userMatched === null) return null;
    const equals = await this.#model.comparePassword(password, userMatched.password);
    if (!equals) return null;
    return userMatched;
  };

  public getUserbyUsername = async (username: string): Promise<IUser | null> => {
    return await this.#model.findOne({ username });
  };

  public getUserById = async (_id: string): Promise<IUser | null> => {
    return await this.#model.findById({ _id });
  };

  public getAllUsers = async (): Promise<IUser[]> => {
    return await this.#model.find();
  };

  public createUser = async (user: IUser): Promise<IUser> => {
    const encryptedPassword = await this.#model.encryptPassword(user.password);
    const newUser = new this.#model({ ...user, password: encryptedPassword });
    return await newUser.save();
  };

  public updateUserById = async (_id: string, user: IUser): Promise<IUser | null> => {
    if (user.password !== undefined) {
      const passwordEncrypted = await this.#model.encryptPassword(user.password);
      user.password = passwordEncrypted;
    }
    return await this.#model.findByIdAndUpdate(_id, user, { new: true });
  };

  public deleteUserById = async (_id: string): Promise<IUser | null> => {
    return await this.#model.findByIdAndDelete(_id);
  };
}
