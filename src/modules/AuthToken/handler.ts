import { Request, Response } from "express";
import { checkUserAndPassword } from "./services";

class AuthHandler {
  //	---------------------------------------------- Login
  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.sendStatus(400);
      } else {
        const user = await checkUserAndPassword(username, password);
        if (!user) return res.sendStatus(401);
        return res.status(200).json({ message: `Welcome ${user.username}` });
      }
    } catch (error) {
      console.error(error);

      res.status(400).json({ error: `ERROR -> ${error}` });
    }
  }

  //	---------------------------------------------- SIGN UP
  async signup(req: Request, res: Response): Promise<Response> {
    try {
      const { username, password } = req.body;
      return res.status(201).json({
        username,
        password,
        message: "Success",
      });
    } catch (error) {
      res.status(400).json({ error: `ERROR ->${error}` });
    }
  }

  //	---------------------------------------------- Log Out
  async logOut(_req: Request, res: Response): Promise<Response> {
    try {
      return res.status(200).json({ msg: `;) profile` });
    } catch (error) {
      res.status(400).json({ error: `ERROR ->${error}` });
    }
  }
  //	---------------------------------------------- PROFILE
  async profile(_req: Request, res: Response): Promise<void> {
    try {
      res.status(200).json({ msg: `;) profile` });
    } catch (error) {
      res.status(400).json({ error: `ERROR ->${error}` });
    }
  }
}

//const service = new AuthSerices();
export const authHandler = new AuthHandler();
