import { Router } from "express";
import { TemplateObcect } from "./handler";

/* Export object with same name in singular camelcase
 * Example: export {templateObcect}
 */

const templateObcectHandler = new TemplateObcect();
const { asyncMethod, syncMethod } = templateObcectHandler;

const templateObcect: Router = Router();
templateObcect
  .get("/example-route/async", asyncMethod)
  .get("/example-route/sync", syncMethod);

export { templateObcect };
