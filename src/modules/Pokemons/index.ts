import { Router } from 'express';
import { httpResponse } from '../HttpResponse';
import { PokemonController } from './controller';
import { pokemonService } from './service';
import { checkSession } from '../Users/users_middlewares';

class PokemonRouter extends PokemonController {
  router: Router;

  constructor() {
    super(httpResponse, pokemonService);

    this.router = Router();
    this.router.get(`/pokemon/:name`, checkSession, this.getOne);
  }
}

export default new PokemonRouter().router;
