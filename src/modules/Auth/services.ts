import { IUser } from "../../types";
import { DBOBJTEST } from "../Databases";

export const checkUserAndPassword = (
  username: string,
  password: string
): IUser | undefined => {
  try {
    const user = DBOBJTEST.find((user) => user.username === username);
    if (!user) throw new Error();
    if (user.password !== password) throw new Error();
    return user;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const getUserById = (id: number): IUser | undefined => {
  try {
    const user = DBOBJTEST.find((user) => user.id === id);
    if (!user) throw new Error();
    return user;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
