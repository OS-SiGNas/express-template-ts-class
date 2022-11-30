import { DBOBJTEST } from "../Databases";
import { User } from "../Users/model";

export const checkUserAndPassword = async (
  username: string,
  password: string
): Promise<User> => {
  try {
    // await method for promisse exampless
    const user = DBOBJTEST.find((user) => user.username === username);
    if (!user) throw new Error();
    if (user.password !== password) throw new Error();
    return user;
  } catch (error) {
    console.error(error);
    return error;
  }
};
