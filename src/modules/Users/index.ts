import { Router } from 'express';
import { type HttpResponse, httpResponse } from '../HttpResponse';
import { UsersController } from './controller';
import { UserService, userService } from './service';
import { checkSession } from './middlewares';

class UsersRouter extends UsersController {
  router: Router;
  constructor(httpResponse: HttpResponse, userService: UserService) {
    super(httpResponse, userService);

    this.router = Router();

    this.router
      .post('/auth', this.auth)

      //middleware
      .use(checkSession)

      .get('/users', this.getUsers)
      .get('/users/:_id', this.getOneUser)
      .post('/users', this.createOneUser)
      .put('/users/:_id', this.updateUser)
      .delete('/users/:_id', this.deleteUser);
  }
}

export const users: Router = new UsersRouter(httpResponse, userService).router;
