import { Saludo } from "./handler";
import { Router } from "express";

const r = Router();
const saludo = new Saludo();

r.get("/saludo", saludo.saludar);
//r.post("/saludo", saludo.enseniar);
//r.put("/saludo", saludo.aprender);
//r.delete("/saludo", saludo.olvidar);

export default r;
