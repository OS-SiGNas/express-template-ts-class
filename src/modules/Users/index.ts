import { type RequestHandler, Router } from 'express';
import { type AnyZodObject } from 'zod';

import { type HttpResponse, httpResponse } from '../shared/httpResponse';
import { UsersController } from './users_controller';
import { type UserService, userService } from './users_service';

import { checkSession } from './users_middlewares';
import { schemaValidator } from '../shared/schemaValidator';
import { type UserSchemas, userSchemas } from './users_schemas';

import { type Rol } from '../types';

class UsersRouter extends UsersController {
  router: Router;
  constructor(
    httpResponse: HttpResponse,
    userService: UserService,
    checkSession: (arg: Rol) => RequestHandler,
    schemaValidator: (arg: AnyZodObject) => RequestHandler,
    userSchemas: UserSchemas
  ) {
    super(httpResponse, userService);

    this.router = Router();
    const { loginSchema, getOneUserSchema, deleteUserSchema, createUserSchema, updateUserSchema } = userSchemas;

    this.router
      .post('/auth', schemaValidator(loginSchema), this.auth)

      // => Protected routes with middleware
      .use('/users', checkSession('admin'))

      .get('/users', this.getUsers)
      .get('/users/:_id', schemaValidator(getOneUserSchema), this.getOneUser)
      .post('/users', schemaValidator(createUserSchema), this.createOneUser)
      .put('/users/:_id', schemaValidator(updateUserSchema), this.updateUser)
      .delete('/users/:_id', schemaValidator(deleteUserSchema), this.deleteUser);
  }
}

export default new UsersRouter(httpResponse, userService, checkSession, schemaValidator, userSchemas).router;
