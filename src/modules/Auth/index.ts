import { Router } from "express";
import { Auth } from "./handler";

const auth = new Auth();
const { signup, signin, profile } = auth;

export const authRouter: Router = Router();
authRouter
  .post("/auth/signup", signup)
  .post("/auth/signin", signin)
  .post("/auth/profile", profile);
