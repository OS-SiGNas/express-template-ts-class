import { Saludo } from "./handler";
import { Router } from "express";

const saludo = new Saludo();

export const saludoRouter = Router();
saludoRouter.get("/saludo", saludo.saludar);
//.post("/saludo", saludo.enseniar)
//.put("/saludo", saludo.aprender)
//.delete("/saludo", saludo.olvidar)
