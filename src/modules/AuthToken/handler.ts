import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { checkUserAndPassword, getUserById } from "./services";

import { config } from "../Config";
const { secretKey } = config;

class AuthHandler {
  //	---------------------------------------------- Login
  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.sendStatus(400);
      } else {
        const user = await checkUserAndPassword(username, password);
        if (!user) return res.sendStatus(401);
        //console.log(user);
        // ==> building Token
        const token: string = sign(
          { id: user.id, username: user.username },
          secretKey,
          {
            expiresIn: 3600,
          }
        );
        return res.status(200).json({ token });
      }
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: `ERROR -> ${error}` });
    }
  }

  //	---------------------------------------------- REGISTER
  async register(req: Request, res: Response) {
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

  //	---------------------------------------------- PROFILE
  async profile(req: Request, res: Response) {
    try {
      const { id } = req.body.dataToken;
      //console.log(req.body.dataToken);
      const { username, name, email, telf, active, registered, rol } =
        await getUserById(id);
      res.json({ username, name, email, telf, active, registered, rol });
    } catch (error) {
      res.status(400).json({ error: `ERROR ->${error}` });
    }
  }
}

//const service = new AuthSerices();
export const authHandler = new AuthHandler();
