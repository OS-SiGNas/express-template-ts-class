import { Request, Response } from "express";
import { checkUserAndPassword } from "./services";
import { v4 } from "uuid";

const _sessions: Array<string> = [];

export class AuthHandler {
  async getSessions(_req: Request, res: Response): Promise<Response> {
    try {
      console.log(_sessions);
      return res.status(200).json({ sessions: `${_sessions}` });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: `ERROR -> ${error}` });
    }
  }

  //	---------------------------------------------- Login
  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.sendStatus(400);
      } else {
        const user = await checkUserAndPassword(username, password);
        if (!user) return res.sendStatus(401);
        const sessionID = v4();
        if (_sessions.find((session) => session === sessionID) !== undefined) {
          return res.status(400).json({ message: "Duplicada" });
        } else {
          //TODO sessionID -> user session tables or documents
          _sessions.push(sessionID);
          return res.status(200).json({ message: `Welcome ${user.username}` });
        }
      }
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: `ERROR -> ${error}` });
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
      return res.status(400).json({ error: `ERROR ->${error}` });
    }
  }

  //	---------------------------------------------- Log Out
  async logOut(_req: Request, res: Response): Promise<Response> {
    try {
      return res.status(200).json({ msg: `;) profile` });
    } catch (error) {
      return res.status(400).json({ error: `ERROR ->${error}` });
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
