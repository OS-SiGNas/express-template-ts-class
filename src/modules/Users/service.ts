import { type User, UserModel } from './model';

export class UserService {
  checkUserAndPassword = async (username: string, password: string): Promise<User | undefined> => {
    const userMatched: User | null = await UserModel.findOne({ username });
    if (userMatched === null) return undefined;
    if (userMatched.password !== password) return undefined;
    return userMatched;
  };

  getUserById = async (_id: string): Promise<User | undefined> => {
    const userMatched = await UserModel.findById({ _id });
    if (userMatched === null) return undefined;
    console.log(userMatched);
    return userMatched;
  };

  getAllUsers = async (): Promise<User[]> => {
    const allUsers = await UserModel.find();
    return allUsers;
  };

  createUser = async (user: typeof UserModel): Promise<User> => {
    const newUser = new UserModel(user);
    await newUser.save();
    return newUser;
  };

  updateUserById = async (_id: string, data: any): Promise<User | undefined> => {
    const userUpdated: User | null = await UserModel.findByIdAndUpdate(_id, data, { new: true });
    if (userUpdated === null) return undefined;
    return userUpdated;
  };

  deleteUserById = async (id: string): Promise<User | undefined> => {
    const userDeleted: User | null = await UserModel.findByIdAndDelete(id);
    if (userDeleted === null) return undefined;
    return userDeleted;
  };
}
