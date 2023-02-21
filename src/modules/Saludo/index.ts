import { Router } from 'express';
import { type HttpResponse, httpResponse } from '../shared/httpResponse';
import { SaludoController } from './controller';
import { type SaludoService, saludoService } from './service';

class SaludoRouter extends SaludoController {
  router: Router;
  constructor(httpResponse: HttpResponse, saludoService: SaludoService) {
    super(httpResponse, saludoService);

    this.router = Router();
    this.router.get('/saludo/:name', this.saludar);

    // this.router.post('/saludo', this.enseniar);
    // this.router.put('/saludo', this.aprender);
    // this.router.delete('/saludo', this.olvidar);
  }
}

export default new SaludoRouter(httpResponse, saludoService).router;
