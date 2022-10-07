import { Request, Response } from "express";
import fetch from "node-fetch";

export class Saludo {
  async saludar(_req: Request, res: Response): Promise<void> {
    try {
      //console.log(req.url);
      const responseSaludo = await fetch("http://localhost:5555/hola/Alfredo");
      const response = await responseSaludo.json();
      console.log(response);
      const { mensaje, status } = response;

      res.json({
        status,
        language: "es-VE",
        data: `${mensaje}`,
      });
    } catch (err) {
      console.log(err);
      res.json({
        status: 400,
        message: `${err}`,
      });
    }
  }
}

//export const saludo = new Saludo();
