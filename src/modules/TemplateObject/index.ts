import { Router } from "express";
import { TemplateObject } from "./controller";

/*
 * Import db connection Object here: new TemplateObcect(dbObject);
 * Export object with same name in singular camelcase
 * Example: export {templateObject}
 */

const PATH = "/example";
const templateObjectController = new TemplateObject();
const { asyncMethod, syncMethod } = templateObjectController;

export const templateObject: Router = Router();
templateObject.get(`${PATH}/async`, asyncMethod).get(`${PATH}/sync`, syncMethod);
