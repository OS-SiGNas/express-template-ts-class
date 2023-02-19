import type { Request, Response } from 'express';
import type { HttpResponse } from '../shared/httpResponse';
import type { UserService } from './users_service';

export class UsersController {
  readonly #response: HttpResponse;
  readonly #service: UserService;
  constructor(httpResponse: HttpResponse, service: UserService) {
    this.#response = httpResponse;
    this.#service = service;
  }

  protected auth = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { username, password } = req.body;
      //if (username === undefined || password === undefined) return this.#response.badRequest(res);
      const user = await this.#service.checkUserAndPassword(username, password);
      if (user === undefined) return this.#response.unauthorized(res, 'Username or password is incorrect');
      const { _id, email, name, roles, telf } = user;
      const token = this.#service.generateJwt(user);
      return this.#response.ok(res, { token, _id, email, username, name, roles, telf });
    } catch (error) {
      console.error(error);
      return this.#response.error(res, error);
    }
  };

  protected getOneUser = async (req: Request, res: Response): Promise<Response> => {
    const { _id } = req.params;
    try {
      const user = await this.#service.getUserById(_id);
      if (user === undefined) return this.#response.notFound(res);
      return this.#response.ok(res, user);
    } catch (error) {
      return this.#response.error(res, error);
    }
  };

  protected getUsers = async (_req: Request, res: Response): Promise<Response> => {
    try {
      const users = await this.#service.getAllUsers();
      return this.#response.ok(res, users);
    } catch (error) {
      return this.#response.error(res, error);
    }
  };

  protected createOneUser = async (req: Request, res: Response): Promise<Response> => {
    // TODO : Validar body en POST /users/
    try {
      const userCreated = await this.#service.createUser(req.body);
      return this.#response.created(res, userCreated);
    } catch (error) {
      return this.#response.error(res, error);
    }
  };

  protected updateUser = async (req: Request, res: Response): Promise<Response> => {
    const { _id } = req.params;
    try {
      const user = await this.#service.updateUserById(_id, req.body);
      if (user === undefined) return this.#response.notFound(res);
      return this.#response.ok(res, user);
    } catch (error) {
      return this.#response.error(res, error);
    }
  };

  protected deleteUser = async (req: Request, res: Response): Promise<Response> => {
    const { _id } = req.params;
    if (_id.length < 24) return this.#response.badRequest(res, 'Argument passed in must be a 24 hex characters');
    try {
      const user = await this.#service.deleteUserById(_id);
      if (user === undefined) return this.#response.notFound(res);
      return this.#response.ok(res, 'Deleted');
    } catch (error) {
      return this.#response.error(res, error);
    }
  };
}
