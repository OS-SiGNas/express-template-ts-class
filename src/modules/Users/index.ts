import { RequestHandler, Router } from 'express';
import { type HttpResponse, httpResponse } from '../HttpResponse';
import { UsersController } from './users_controller';
import { UserService, userService } from './users_service';
import { checkSession } from './users_middlewares';
import { loginValidator, userModelValidator } from './schemaValidators';

class UsersRouter extends UsersController {
  router: Router;
  constructor(httpResponse: HttpResponse, userService: UserService, checkSession: RequestHandler, loginValidator: RequestHandler) {
    super(httpResponse, userService);

    this.router = Router();

    this.router
      .post('/auth', loginValidator, this.auth)

      // => Protected with middleware
      .use('/users', checkSession)
      .get('/users', this.getUsers)
      .get('/users/:_id', this.getOneUser)
      .post('/users', userModelValidator, this.createOneUser)
      .put('/users/:_id', this.updateUser)
      .delete('/users/:_id', this.deleteUser);
  }
}

export const users: Router = new UsersRouter(httpResponse, userService, checkSession, loginValidator).router;
