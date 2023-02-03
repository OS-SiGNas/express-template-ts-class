import { Router } from 'express';
import { httpResponse } from '../Response/httpResponse';
import { UsersController } from './controller';
import { userService } from './service';
import { checkSession } from './middlewares';

class UsersRouter extends UsersController {
  router: Router;
  constructor() {
    super(httpResponse, userService);

    this.router = Router();

    this.router.post('/auth', this.login);

    this.router.use(checkSession);
    this.router.get('/', this.getUsers);
    this.router.get('/:_id', this.getOneUser);
    this.router.put('/:_id', this.updateUser);
    this.router.delete('/:_id', this.deleteUser);
  }
}

export const users = new UsersRouter().router;
