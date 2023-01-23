import { RequestHandler, Router } from "express";
import { checkSession } from "../AuthToken/checkSession";
import { getOne } from "./handler";

const testHandler: RequestHandler = (_req, _res) => {
  console.log("-> -> pass");
};

const r: Router = Router();

r.get(`/test/`, checkSession, testHandler);
r.get(`/getOne/:name`, checkSession, getOne);

export const poke: Router = Router();
poke.use("/pokemon", r);
