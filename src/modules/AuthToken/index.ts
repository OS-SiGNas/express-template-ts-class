// TOKEN
import { Router } from "express";
import { authHandler } from "./handler";
import { checkSession } from "./checkSession";

const { login, register, profile } = authHandler;

const r: Router = Router();

r.get(`/login`, login)
  .post(`/register`, register)
  .post(`/profile`, checkSession, profile);

const auth: Router = Router();
auth.use("/auth", r);
export { auth, checkSession };
