import { Router } from "express";
import { authHandler } from "./handler";
import { checkSession } from "./checkSession";

const PATH = "/auth";

const { login, signup, logOut, profile } = authHandler;

const auth: Router = Router();
/*
auth.use((req: Request, _res: Response, next: NextFunction): void => {
  console.log("Any Middleware");
  next();
});
*/

auth.get(`${PATH}/logOut`, logOut);
auth.get(`${PATH}/signup`, signup);
auth.post(`${PATH}/login`, login);
auth.post(`${PATH}/signup`, signup);
auth.post(`${PATH}/profile`, profile);

export { auth, checkSession };
