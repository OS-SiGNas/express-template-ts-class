import { Router } from 'express';
import { httpResponse } from '../Response/httpResponse';
import { SaludoController } from './controller';
import { saludoService } from './service';

class SaludoRouter extends SaludoController {
  router: Router;
  constructor() {
    super(httpResponse, saludoService);

    this.router = Router();
    this.router.get('/:name', this.saludar);

    //this.router.post('/saludo', this.enseniar);
    //this.router.put('/saludo', this.aprender);
    //this.router.delete('/saludo', this.olvidar);
  }
}

export const saludo = new SaludoRouter().router;
