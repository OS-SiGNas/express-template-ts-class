import server from './server';

import type { Server } from './server';

((server: Server): void => {
  void server.run();
})(server);

// if environment is different than 'test' server.app will return undefined
export default server.app;
