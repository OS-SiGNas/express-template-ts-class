import { type Request, type Response } from 'express';
import { sign } from 'jsonwebtoken';

import { config } from '../Config';
import { HttpResponse } from '../Helpers/httpResponse';
import { UserService } from '../Users/service';

// import { getUserById } from './services'

export class AuthController {
  #httpResponse: HttpResponse;
  #service: UserService;

  constructor() {
    this.#httpResponse = new HttpResponse();
    this.#service = new UserService();

    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    // this.profile = this.profile.bind(this)
  }

  async register(req: Request, res: Response): Promise<Response> {
    try {
      const userCreated = await this.#service.createUser(req.body);
      return this.#httpResponse.created(res, userCreated);
    } catch (error) {
      return this.#httpResponse.error(res, error);
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { username, password } = req.body;
      if (username === undefined || password === undefined) return this.#httpResponse.badRequest(res);

      const user = await this.#service.checkUserAndPassword(username, password);
      if (user === undefined) return this.#httpResponse.unauthorized(res, 'Username or password is incorrect');

      // ==> building Token
      const token = sign({ user }, config.getJwtSecretKey(), { expiresIn: 3600 });
      return this.#httpResponse.ok(res, { token });
    } catch (error) {
      console.error(error);
      return this.#httpResponse.error(res, error);
    }
  }

  /*
  async profile (req: Request, res: Response): Promise<Response> {
    try {
      console.log(req.body.dataToken)
      const { id } = req.body.dataToken
      const user = getUserById(id)
      if (user !== undefined) {
        const { username, name, email, telf, active, registered, rol } = user
        return res.json({ username, name, email, telf, active, registered, rol })
      } else {
        return res.json({ message: `No user with id ${id}` })
      }
    } catch (error) {
      return this.#httpResponse.error(res, error)
    }
  }
*/
}
