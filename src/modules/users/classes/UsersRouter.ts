import type UsersController from './UsersController';
import type { Router, RequestHandler } from 'express';
import type { AnyZodObject } from 'zod';
import type { UsersSchema } from './UsersSchema';
import type { Rol } from '../types';

interface Dependences {
  router: Router;
  controller: UsersController;
  checkSession: (arg: Rol) => RequestHandler;
  schemaValidator: (arg: AnyZodObject) => RequestHandler;
  usersSchema: UsersSchema;
}

export default class UsersRouter {
  readonly #router: Router;
  constructor({ router, controller, checkSession, schemaValidator, usersSchema }: Dependences) {
    const { auth, getUsers, getUser, postUser, putUser, deleteUser } = controller;
    const { loginSchema, getOneUserSchema, createUserSchema, updateUserSchema, deleteUserSchema } = usersSchema;

    this.#router = router;
    this.#router
      .post('/auth', schemaValidator(loginSchema), auth)

      // => Protected routes with middleware
      .use('/users', checkSession('admin'))

      .get('/users', getUsers)
      .get('/users/:_id', schemaValidator(getOneUserSchema), getUser)
      .post('/users', schemaValidator(createUserSchema), postUser)
      .put('/users/:_id', schemaValidator(updateUserSchema), putUser)
      .delete('/users/:_id', schemaValidator(deleteUserSchema), deleteUser);
  }

  get router(): Router {
    return this.#router;
  }
}
