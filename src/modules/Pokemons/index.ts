import { type RequestHandler, Router } from 'express';

import { PokemonController } from './controller';
import { pokemonService } from './service';

import { httpResponse } from '../shared';
import { checkSession } from '../Users';

import type { Rol } from '../Users/types';

class PokemonRouter extends PokemonController {
  router: Router;

  constructor(checkSession: (arg: Rol) => RequestHandler) {
    super(httpResponse, pokemonService);

    this.router = Router();
    this.router.get(`/pokemon/:name`, checkSession('audit'), this.getOne);
  }
}

export default new PokemonRouter(checkSession).router;
