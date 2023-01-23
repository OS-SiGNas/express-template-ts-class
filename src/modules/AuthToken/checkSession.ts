import { RequestHandler } from "express";
import { verify } from "jsonwebtoken";
import { config } from "../Config";
const { secretKey } = config;

export const checkSession: RequestHandler = (req, res, next) => {
  const { authorization } = req.headers;
  if (typeof authorization === "undefined") return res.sendStatus(403);
  const token = authorization.split(" ").pop();
  const payload = verify(token || "", secretKey);
  req.body.dataToken = payload;
  return next();
};
