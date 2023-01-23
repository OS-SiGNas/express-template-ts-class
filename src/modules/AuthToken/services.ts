import { DBOBJTEST } from "../Databases";

export const checkUserAndPassword = async (
  username: string,
  password: string
) => {
  try {
    const user = await DBOBJTEST.find((user) => user.username === username);
    if (!user) throw new Error();
    if (user.password !== password) throw new Error();
    return user;
  } catch (error) {
    console.error(error);
  }
};

export const getUserById = async (id: number) => {
  try {
    const user = await DBOBJTEST.find((user) => user.id === id);
    if (!user) throw new Error();
    return user;
  } catch (error) {
    console.error(error);
  }
};
