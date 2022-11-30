import { Router } from "express";
import { TemplateObject } from "./handler";

/*
 * Import db connection Object here: new TemplateObcect(dbObject);
 * Export object with same name in singular camelcase
 * Example: export {templateObject}
 */

const PATH = "/example";
const templateObjectHandler = new TemplateObject();
const { asyncMethod, syncMethod } = templateObjectHandler;

export const templateObject: Router = Router();
templateObject
  .get(`${PATH}/async`, asyncMethod)
  .get(`${PATH}/sync`, syncMethod);
