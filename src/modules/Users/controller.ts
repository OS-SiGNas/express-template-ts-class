import { type Request, type Response } from 'express';
import { HttpResponse } from '../Helpers/httpResponse';
import { UserService } from './service';

export class UsersController {
  #httpResponse: HttpResponse;
  #service: UserService;

  constructor() {
    this.#httpResponse = new HttpResponse();
    this.#service = new UserService();
  }

  getOneUser = async (req: Request, res: Response): Promise<Response> => {
    const { _id } = req.params;
    console.log(_id);
    try {
      const user = await this.#service.getUserById(_id);
      if (user === undefined) return this.#httpResponse.notFound(res);
      console.log(user);
      return this.#httpResponse.ok(res, user);
    } catch (error) {
      return this.#httpResponse.error(res, error);
    }
  };

  getUsers = async (_req: Request, res: Response): Promise<Response> => {
    try {
      const users = await this.#service.getAllUsers();
      console.log(users);
      return this.#httpResponse.ok(res, users);
    } catch (error) {
      return this.#httpResponse.error(res, error);
    }
  };

  updateUser = async (req: Request, res: Response): Promise<Response> => {
    const { _id } = req.params;
    const { body } = req;
    try {
      const user = await this.#service.updateUserById(_id, body);
      if (user === undefined) return this.#httpResponse.notFound(res);
      return this.#httpResponse.ok(res, user);
    } catch (error) {
      return this.#httpResponse.error(res, error);
    }
  };

  deleteUser = async (req: Request, res: Response): Promise<Response> => {
    const { _id } = req.params;
    try {
      const user = await this.#service.deleteUserById(_id);
      if (user === undefined) return this.#httpResponse.notFound(res);
      console.log(user);
      return this.#httpResponse.ok(res, 'Deleted');
    } catch (error) {
      return this.#httpResponse.error(res, error);
    }
  };
}
