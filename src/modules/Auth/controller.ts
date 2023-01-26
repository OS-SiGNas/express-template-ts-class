import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { config } from "../Config";
import { checkUserAndPassword, getUserById } from "./services";

class AuthController {
  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.sendStatus(400);
      } else {
        const user = checkUserAndPassword(username, password);
        if (!user) return res.sendStatus(401);
        // ==> building Token
        const token = sign({ id: user.id }, config.secretKey, { expiresIn: 3600 });
        return res.status(200).json({ token });
      }
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: `ERROR -> ${error}` });
    }
  }

  async register(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      return res.status(201).json({ username, password, message: "Success" });
    } catch (error) {
      return res.status(400).json({ error: `ERROR ->${error}` });
    }
  }

  async profile(req: Request, res: Response) {
    try {
      console.log(req.body.dataToken);
      const { id } = req.body.dataToken;
      const user = getUserById(id);
      if (user !== undefined) {
        const { username, name, email, telf, active, registered, rol } = user;
        return res.json({ username, name, email, telf, active, registered, rol });
      } else {
        return res.json({ message: `No user with id ${id}` });
      }
    } catch (error) {
      return res.status(400).json({ error: `ERROR -> ${error}` });
    }
  }
}

export const authHandler = new AuthController();
