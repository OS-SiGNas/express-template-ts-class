import { Movies } from "./handler";
import { Router } from "express";

const path = "/movies";

const handler = new Movies();
const { getOne, getAll, updateOne, createOne, deleteOne } = handler;

export const moviesRouter = Router();
moviesRouter
  .get(`${path}/:id`, getOne)
  .get(path, getAll)
  .post(path, createOne)
  .put(`${path}/:id`, updateOne)
  .delete(`${path}/:id`, deleteOne);
