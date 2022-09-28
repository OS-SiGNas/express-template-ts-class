import { Movies } from "./handler";
import { Router } from "express";

const r = Router();
const exec = new Movies();
const path = "/movies";

r.get(`${path}/:id`, exec.getOne);
r.get(path, exec.getAll);

r.post(path, exec.createOne);

r.put(`${path}/:id`, exec.updateOne);

r.delete(`${path}/:id`, exec.deleteOne);

export default r;
