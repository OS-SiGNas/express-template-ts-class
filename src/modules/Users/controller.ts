import { type Request, type Response } from 'express';
import { type HttpResponse } from '../Response/httpResponse';
import { UserService } from './service';

export class UsersController {
  #response: HttpResponse;
  #service: UserService;
  constructor(httpResponse: HttpResponse, service: UserService) {
    this.#response = httpResponse;
    this.#service = service;
  }

  login = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { username, password } = req.body;
      if (username === undefined || password === undefined) return this.#response.badRequest(res);
      const user = await this.#service.checkUserAndPassword(username, password);
      if (user === undefined) return this.#response.unauthorized(res, 'Username or password is incorrect');
      const token = this.#service.generateJwt(user);
      return this.#response.ok(res, { token });
    } catch (error) {
      console.error(error);
      return this.#response.error(res, error);
    }
  };

  createOneUser = async (req: Request, res: Response): Promise<Response> => {
    try {
      const userCreated = await this.#service.createUser(req.body);
      return this.#response.created(res, userCreated);
    } catch (error) {
      return this.#response.error(res, error);
    }
  };

  getOneUser = async (req: Request, res: Response): Promise<Response> => {
    const { _id } = req.params;
    console.log(_id);
    try {
      const user = await this.#service.getUserById(_id);
      if (user === undefined) return this.#response.notFound(res);
      console.log(user);
      return this.#response.ok(res, user);
    } catch (error) {
      return this.#response.error(res, error);
    }
  };

  getUsers = async (_req: Request, res: Response): Promise<Response> => {
    try {
      const users = await this.#service.getAllUsers();
      console.log(users);
      return this.#response.ok(res, users);
    } catch (error) {
      return this.#response.error(res, error);
    }
  };

  updateUser = async (req: Request, res: Response): Promise<Response> => {
    const { _id } = req.params;
    const { body } = req;
    try {
      const user = await this.#service.updateUserById(_id, body);
      if (user === undefined) return this.#response.notFound(res);
      return this.#response.ok(res, user);
    } catch (error) {
      return this.#response.error(res, error);
    }
  };

  deleteUser = async (req: Request, res: Response): Promise<Response> => {
    const { _id } = req.params;
    try {
      const user = await this.#service.deleteUserById(_id);
      if (user === undefined) return this.#response.notFound(res);
      console.log(user);
      return this.#response.ok(res, 'Deleted');
    } catch (error) {
      return this.#response.error(res, error);
    }
  };
}
