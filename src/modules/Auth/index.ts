import { Router } from "express";
import { Auth } from "./handler";
import { checkSession } from "./checkSession";
import { usersWarehouse } from "../Databases";

const PATH = "/auth";
const authHandler = new Auth(usersWarehouse);
const { login, signup, logOut, profile } = authHandler;

const auth: Router = Router();
auth
  .get(`${PATH}/login`, login)
  .get(`${PATH}/logOut`, logOut)
  .get(`${PATH}/signup`, signup)
  .post(`${PATH}/signup`, signup)
  .post(`${PATH}/profile`, profile);

export { auth, checkSession };
