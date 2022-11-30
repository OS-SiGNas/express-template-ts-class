import { DBOBJTEST } from "../Databases";
import { User } from "../Users/model";

export const checkUserAndPassword = async (
  username: string,
  password: string
): Promise<User> => {
  try {
    const user = await DBOBJTEST.find((user) => user.username === username);
    if (!user) throw new Error();
    if (user.password !== password) throw new Error();
    return user;
  } catch (error) {
    console.error(error);
  }
};
