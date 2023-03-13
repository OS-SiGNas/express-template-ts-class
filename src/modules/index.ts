// Express Routers Objects
import users from './users';

// last
import notFound from './404';
import { errorHandler } from './errorHandler';
// types
import type { Modules } from './types';

/***************************************************************
                Add Routers modules in the array
****************************************************************/
const modules: Modules = [users];

/***************************************************************
                           ReadOnly
 notFound and errorHandler need to be in the last position or 🪲
***************************************************************/
modules.push(notFound, errorHandler);

export default modules;
