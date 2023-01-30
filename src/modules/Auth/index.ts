import { Router } from 'express';
import { AuthController } from './controller';
// import { checkSession } from './checkSession'

export class Auth extends AuthController {
  router: Router;
  constructor() {
    super();

    this.router = Router();
    this.router.post('/register', this.register);
    this.router.get('/login', this.login);
    //this.router.post('/profile', this.profile)
  }
}
