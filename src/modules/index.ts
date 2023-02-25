// Express Routers Objects
import users from './Users';
import saludo from './Saludo';
import poke from './Pokemons';
import notes from './Notes';
import notFound from './404';

// middleware
import { errorHandler } from './ErrorHandler';

// types
import { type Modules } from './types';

// Add Routers modules in the array
export const modules: Modules = [users, saludo, poke, notes];

// ReadOnly  notFound and errorHandler need to be in the last position or 🪲
modules.push(notFound, errorHandler);
