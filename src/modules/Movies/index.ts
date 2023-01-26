import { MoviesController } from "./controller";
import { Router } from "express";

const path = "/movies";

const handler = new MoviesController();
const { getOne, getAll, updateOne, createOne, deleteOne } = handler;

export const movies = Router();
movies.get(`${path}/:id`, getOne).get(path, getAll).post(path, createOne).put(`${path}/:id`, updateOne).delete(`${path}/:id`, deleteOne);
