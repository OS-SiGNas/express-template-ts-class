import { Router } from 'express';
import { httpResponse } from '../HttpResponse';
import { PokemonController } from './controller';
import { pokemonService } from './service';
import { checkSession } from '../Users/middlewares';

class PokemonRouter extends PokemonController {
  router: Router;

  constructor() {
    super(httpResponse, pokemonService);

    this.router = Router();
    this.router.get(`/:name`, checkSession, this.getOne);
  }
}

export const poke = new PokemonRouter().router;
