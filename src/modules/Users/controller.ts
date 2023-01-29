import { type Request, type Response } from 'express';
import { HttpResponse } from '../Helpers/httpResponse';
import { User } from './model';
import { UserService } from './service';

export class UsersController extends UserService {
  #httpResponse: HttpResponse;

  constructor() {
    super();
    this.#httpResponse = new HttpResponse();

    this.getOneUser = this.getOneUser.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  async getOneUser(req: Request, res: Response): Promise<Response> {
    const { _id } = req.params;
    console.log(_id);
    try {
      const user = await this.getUserById(_id);
      if (user === undefined) return this.#httpResponse.notFound(res);
      console.log(user);
      return this.#httpResponse.ok(res, user);
    } catch (error) {
      return this.#httpResponse.error(res, error);
    }
  }

  async getUsers(_req: Request, res: Response): Promise<Response> {
    try {
      const users = await this.getAllUsers();
      console.log(users);
      return this.#httpResponse.ok(res, users);
    } catch (error) {
      return this.#httpResponse.error(res, error);
    }
  }

  async updateUser(req: Request, res: Response): Promise<Response> {
    const { _id } = req.params;
    const { body } = req;
    try {
      const user = await this.updateUserById(_id, body);
      if (user === undefined) return this.#httpResponse.notFound(res);
      return this.#httpResponse.ok(res, user);
    } catch (error) {
      return this.#httpResponse.error(res, error);
    }
  }

  async deleteUser(req: Request, res: Response): Promise<Response> {
    const { _id } = req.params;
    try {
      const user = await this.deleteUserById(_id);
      if (user === undefined) return this.#httpResponse.notFound(res);
      console.log(user);
      return this.#httpResponse.ok(res, 'Deleted');
    } catch (error) {
      return this.#httpResponse.error(res, error);
    }
  }
}
