import { type Request, type Response } from 'express';
import { type SaludoService } from './service';
import type HttpResponse from "../shared/HttpResponse";

export class SaludoController {
  #response: HttpResponse;
  #service: SaludoService;
  constructor(httpResponse: HttpResponse, saludoService: SaludoService) {
    this.#response = httpResponse;
    this.#service = saludoService;
  }

  saludar = async (req: Request, res: Response): Promise<Response> => {
    const { name } = req.params;
    console.log(name);

    try {
      const responseSaludo = await this.#service.getSaludo(name);
      return this.#response.ok(res, { language: 'es-VE', responseSaludo });
    } catch (error) {
      console.error(error);
      return this.#response.error(res, error);
    }
  };
}
