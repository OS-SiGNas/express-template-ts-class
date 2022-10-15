import { Request, Response } from "express";

export class Auth {
  #db: object;
  constructor(db: object) {
    this.#db = db;
  }
  //	---------------------------------------------- SIGN UP
  async signup(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;
      res.status(201).json({
        username,
        password,
        message: "Success",
      });
    } catch (error) {
      res.status(400).json({ error: `ERROR ->${error}` });
    }
  }

  //	---------------------------------------------- Login
  async login(_req: Request, res: Response): Promise<void> {
    try {
      res.status(200).json({ msg: `;) sign in` });
    } catch (error) {
      res.status(400).json({ error: `ERROR ->${error}` });
    }
  }

  //	---------------------------------------------- Log Out
  async logOut(_req: Request, res: Response): Promise<void> {
    try {
      res.status(200).json({ msg: `;) profile` });
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
