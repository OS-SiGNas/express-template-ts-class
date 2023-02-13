import { Router, type Request, type Response } from 'express';
import { type HttpResponse, httpResponse } from '../HttpResponse';

class NotFound {
  router: Router;
  #response: HttpResponse;
  constructor(httpResponse: HttpResponse) {
    this.router = Router();
    this.#response = httpResponse;
    this.router
      .get('/404', this.noEndpoint)
      .get('*', this.noEndpoint)
      .post('*', this.noEndpoint)
      .put('*', this.noEndpoint)
      .patch('*', this.noEndpoint)
      .delete('*', this.noEndpoint);
  }
  noEndpoint = (_req: Request, res: Response) => {
    return this.#response.notFound(res);
  };
}

export default new NotFound(httpResponse).router;
