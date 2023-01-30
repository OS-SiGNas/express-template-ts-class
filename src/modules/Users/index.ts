import { Router } from 'express';
import { UsersController } from './controller';
// import { checkSession } from './checkSession'

export class Users extends UsersController {
  router: Router;
  constructor() {
    super();

    this.router = Router();
    this.router.get('/', this.getUsers);
    this.router.get('/:_id', this.getOneUser);
    this.router.put('/:_id', this.updateUser);
    this.router.delete('/:_id', this.deleteUser);
  }
}
