import { type Router } from 'express';

// Express Routers Objects
import users from './Users';
import saludo from './Saludo';
import poke from './Pokemons';
import notFound from './404';

export const modules: Array<Router> = [users, saludo, poke];
modules.push(notFound); // the module notFound router should always be last
