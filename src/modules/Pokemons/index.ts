import { RequestHandler, Router } from "express";
import { checkSession } from "../Auth/checkSession";
import { getOne } from "./controller";

const testHandler: RequestHandler = (_req, _res) => {
  console.log("-> -> pass");
};

const r: Router = Router();

r.get(`/test/`, checkSession, testHandler);
r.get(`/getOne/:name`, checkSession, getOne);

export const poke: Router = Router();
poke.use("/pokemon", r);
