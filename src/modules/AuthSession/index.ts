import { Router } from "express";
import { AuthHandler } from "./handler";

const authHandler = new AuthHandler();
const { login, signup, logOut, profile, getSessions } = authHandler;

const routes: Router = Router();
routes
  .get(`/sessions`, getSessions)
  .get(`/logOut`, logOut)
  .get(`/signup`, signup)
  .post(`/login`, login)
  .post(`/signup`, signup)
  .post(`/profile`, profile);

export const auth: Router = Router();
auth.use("/auth", routes);
