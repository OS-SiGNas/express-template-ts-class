import { Request, Response } from "express";
import { Mongoose } from "mongoose";
import {} from "../Databases/usersWarehouse";

export class Auth {
  #db: Mongoose;
  constructor() {
    this.#db = usersWarehouse();
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

  //	---------------------------------------------- SIGN UP
  async signin(_req: Request, res: Response): Promise<void> {
    try {
      res.status(200).json({ msg: `;) sign in` });
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
