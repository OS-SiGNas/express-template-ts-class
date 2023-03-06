import { Router } from 'express';

// types
import type UsersController from './users_controller';
import type { RequestHandler } from 'express';
import type { AnyZodObject } from 'zod';
import type { UserSchemas } from './users_schemas';
import type { Rol } from './types';

interface Dependences {
  usersController: UsersController;
  checkSession: (arg: Rol) => RequestHandler;
  schemaValidator: (arg: AnyZodObject) => RequestHandler;
  userSchemas: UserSchemas;
}

export default class UsersRouter {
  readonly #router: Router;
  constructor({ usersController, checkSession, schemaValidator, userSchemas }: Dependences) {
    const { auth, createOneUser, deleteUser, getOneUser, getUsers, updateUser } = usersController;
    const { loginSchema, getOneUserSchema, deleteUserSchema, createUserSchema, updateUserSchema } = userSchemas;

    this.#router = Router();
    this.#router
      .post('/auth', schemaValidator(loginSchema), auth)

      // => Protected routes with middleware
      .use('/users', checkSession('admin'))

      .get('/users', getUsers)
      .get('/users/:_id', schemaValidator(getOneUserSchema), getOneUser)
      .post('/users', schemaValidator(createUserSchema), createOneUser)
      .put('/users/:_id', schemaValidator(updateUserSchema), updateUser)
      .delete('/users/:_id', schemaValidator(deleteUserSchema), deleteUser);
  }

  get router(): Router {
    return this.#router;
  }
}

