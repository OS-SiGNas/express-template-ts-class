import { NextFunction, Request, Response } from "express";

export const checkSession = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const headerAuth = req.params.token || "";
  //TODO Bearer 12312321
  const token = headerAuth.split(" ").pop();
  !token ? res.status(405) : res.send({ error: "No tienes permisos" });

  next();
};
