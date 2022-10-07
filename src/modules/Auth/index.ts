import { Router } from "express";
import { Auth } from "./handler";
import { checkSession } from "./checkSession";

const auth = new Auth();
const { signup, signin, profile } = auth;

const authRouter: Router = Router();
authRouter
  .post("/auth/signup", signup)
  .post("/auth/signin", signin)
  .post("/auth/profile", profile);

export { authRouter, checkSession };
