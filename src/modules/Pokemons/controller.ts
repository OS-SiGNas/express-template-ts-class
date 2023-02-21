import { type Request, type Response } from 'express';
import { type HttpResponse } from '../shared/httpResponse';
import { type PokemonService } from './service';

export class PokemonController {
  #response: HttpResponse;
  #service: PokemonService;
  constructor(httpResponse: HttpResponse, pokemonService: PokemonService) {
    this.#response = httpResponse;
    this.#service = pokemonService;
  }

  getOne = async (req: Request, res: Response): Promise<Response> => {
    const { name } = req.params;
    try {
      const data = await this.#service.getPokemonByName(name);
      if (data === undefined) return this.#response.notFound(res);
      return this.#response.ok(res, data);
    } catch (error) {
      return this.#response.error(res, error);
    }
  };
}
