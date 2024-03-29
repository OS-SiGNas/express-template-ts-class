import type { Request, Response } from 'express';
import type { HttpResponse } from '../../shared/HttpResponse';
import type { Rol, IUserService } from '../types';

interface Dependences {
  httpResponse: HttpResponse;
  service: IUserService;
  generateJwt: (userId: string, roles: Rol[]) => string;
}

export default class UsersController {
  readonly #response: HttpResponse;
  readonly #service: IUserService;
  readonly #generateJwt: (userId: string, roles: Rol[]) => string;
  constructor({ httpResponse, service, generateJwt }: Dependences) {
    this.#response = httpResponse;
    this.#service = service;
    this.#generateJwt = generateJwt;
  }

  public auth = async (req: Request, res: Response): Promise<Response> => {
    const { username, password } = req.body;
    try {
      const user = await this.#service.checkUserAndPassword(username, password);
      if (user === null) return this.#response.unauthorized(res, 'Username or password is incorrect');
      const { _id, email, name, roles, telf } = user;
      const token = this.#generateJwt(_id, roles);
      return this.#response.ok(res, { token, _id, email, username, name, roles, telf });
    } catch (error) {
      return this.#response.error(res, error);
    }
  };

  public getUser = async (req: Request, res: Response): Promise<Response> => {
    const { _id } = req.params;
    try {
      const user = await this.#service.getUserById(_id);
      if (user === null) return this.#response.notFound(res);
      return this.#response.ok(res, user);
    } catch (error) {
      return this.#response.error(res, error);
    }
  };

  public getUsers = async (_req: Request, res: Response): Promise<Response> => {
    try {
      const users = await this.#service.getAllUsers();
      return this.#response.ok(res, users);
    } catch (error) {
      return this.#response.error(res, error);
    }
  };

  public postUser = async (req: Request, res: Response): Promise<Response> => {
    try {
      const userCreated = await this.#service.createUser(req.body);
      return this.#response.created(res, userCreated);
    } catch (error) {
      return this.#response.error(res, error);
    }
  };

  public putUser = async (req: Request, res: Response): Promise<Response> => {
    const { _id } = req.params;
    try {
      const user = await this.#service.updateUserById(_id, req.body);
      if (user === null) return this.#response.notFound(res, `No user with id: ${_id}`);
      return this.#response.ok(res, user);
    } catch (error) {
      return this.#response.error(res, error);
    }
  };

  public deleteUser = async (req: Request, res: Response): Promise<Response> => {
    const { _id } = req.params;
    try {
      const user = await this.#service.deleteUserById(_id);
      if (user === null) return this.#response.notFound(res, `No user with id: ${_id}`);
      return res.sendStatus(204);
    } catch (error) {
      return this.#response.error(res, error);
    }
  };
}
