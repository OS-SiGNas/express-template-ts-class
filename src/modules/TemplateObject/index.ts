import { Router } from "express";
import { TemplateObcect } from "./handler";

/*
 * Import db connection Object here: new TemplateObcect(dbObject);
 * Export object with same name in singular camelcase
 * Example: export {templateObcect}
 */

const PATH = "/example";
const templateObcectHandler = new TemplateObcect();
const { asyncMethod, syncMethod } = templateObcectHandler;

export const templateObcect: Router = Router();
templateObcect
  .get(`${PATH}/async`, asyncMethod)
  .get(`${PATH}/sync`, syncMethod);
