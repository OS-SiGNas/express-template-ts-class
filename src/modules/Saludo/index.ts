import { Saludo } from "./handler";
import { Router } from "express";

const saludoHandler = new Saludo();
const { saludar } = saludoHandler;

export const saludo = Router();
saludo.get("/saludo", saludar);
//.post("/saludo", saludo.enseniar)
//.put("/saludo", saludo.aprender)
//.delete("/saludo", saludo.olvidar)
