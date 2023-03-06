import type { Request, Response } from 'express';
import type HttpResponse from '../shared/HttpResponse';
import type { IAuthWithJwtService, IUserService } from './types';
interface Dependences {
  httpResponse: HttpResponse;
  userService: IUserService;
  authService: IAuthWithJwtService;
}

export default class UsersController {
  readonly #response: HttpResponse;
  readonly #service: IUserService;
  readonly #authService: IAuthWithJwtService;
  constructor({ httpResponse, userService, authService }: Dependences) {
    this.#response = httpResponse;
    this.#service = userService;
    this.#authService = authService;
  }

  auth = async (req: Request, res: Response): Promise<Response> => {
    const { username, password } = req.body;
    try {
      const user = await this.#service.checkUserAndPassword(username, password);
      if (user === null) return this.#response.unauthorized(res, 'Username or password is incorrect');
      const { _id, email, name, roles, telf } = user;
      const token = this.#authService.generateJwt(user);
      return this.#response.ok(res, { token, _id, email, username, name, roles, telf });
    } catch (error) {
      return this.#response.error(res, error);
    }
  };

  getOneUser = async (req: Request, res: Response): Promise<Response> => {
    const { _id } = req.params;
    try {
      const user = await this.#service.getUserById(_id);
      if (user === null) return this.#response.notFound(res);
      return this.#response.ok(res, user);
    } catch (error) {
      return this.#response.error(res, error);
    }
  };

  getUsers = async (_req: Request, res: Response): Promise<Response> => {
    try {
      const users = await this.#service.getAllUsers();
      return this.#response.ok(res, users);
    } catch (error) {
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

  updateUser = async (req: Request, res: Response): Promise<Response> => {
    const { _id } = req.params;
    try {
      const user = await this.#service.updateUserById(_id, req.body);
      if (user === null) return this.#response.notFound(res);
      return this.#response.ok(res, user);
    } catch (error) {
      return this.#response.error(res, error);
    }
  };

  deleteUser = async (req: Request, res: Response): Promise<Response> => {
    const { _id } = req.params;
    try {
      const user = await this.#service.deleteUserById(_id);
      if (user === null) return this.#response.notFound(res);
      return this.#response.ok(res, 'Deleted');
    } catch (error) {
      return this.#response.error(res, error);
    }
  };
}

