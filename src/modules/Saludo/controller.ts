import { Request, Response } from "express";
import fetch from "node-fetch";

export class Saludo {
  async saludar(_req: Request, res: Response) {
    try {
      //console.log(req.url);
      const responseSaludo = await fetch("http://localhost:5555/hola/Alfredo");
      const response = await responseSaludo.json();
      //console.log(response);
      const { mensaje, status } = response;
      return res.json({
        status,
        language: "es-VE",
        data: mensaje,
      });
    } catch (err) {
      console.error(err);
      return res.json({
        status: 400,
        message: `${err}`,
      });
    }
  }
}
//export const saludo = new Saludo();
