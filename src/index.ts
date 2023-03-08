import server from './server';

import type { IServer } from './types';

(function (server: IServer) {
  void server.run();
})(server);

/* if environment is different than 'test'
 * server.app will return undefined
 */
export default server.app;
