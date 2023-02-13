import { type RequestHandler, Router } from 'express';
import { AnyZodObject } from 'zod';

import { type HttpResponse, httpResponse } from '../HttpResponse';

import { UsersController } from './users_controller';
import { type UserService, userService } from './users_service';

import { checkSession } from './users_middlewares';
import { schemaValidator } from '../shared/schemaValidator';
import { loginSchema, userSchema, updateUserSchema } from './users_schemas';

class UsersRouter extends UsersController {
  router: Router;
  constructor(
    httpResponse: HttpResponse,
    userService: UserService,
    checkSession: RequestHandler,
    schemaValidator: (arg: AnyZodObject) => RequestHandler,
    loginSchema: AnyZodObject,
    userSchema: AnyZodObject,
    updateUserSchema: AnyZodObject
  ) {
    super(httpResponse, userService);

    this.router = Router();

    this.router
      .post('/auth', schemaValidator(loginSchema), this.auth)

      // => Protected routes with middleware
      .use('/users', checkSession)

      .get('/users', this.getUsers)
      .get('/users/:_id', this.getOneUser)
      .post('/users', schemaValidator(userSchema), this.createOneUser)
      .put('/users/:_id', schemaValidator(updateUserSchema), this.updateUser)
      .delete('/users/:_id', this.deleteUser);
  }
}

export default new UsersRouter(
  httpResponse,
  userService,
  checkSession,
  schemaValidator,
  loginSchema,
  userSchema,
  updateUserSchema
).router;
