import { sign, verify } from 'jsonwebtoken';

import type { SignOptions } from 'jsonwebtoken';
import type { Rol, Payload } from '../types';

export default class AuthSerice {
  readonly #secretKey: string;
  readonly #options: SignOptions;
  constructor(secretKey: string, options: SignOptions) {
    this.#secretKey = secretKey;
    this.#options = options;
  }

  public generateJwt = (userId: string, roles: Rol[]): string => {
    return sign({ userId, roles }, this.#secretKey, this.#options);
  };

  public verifyJwt = (token: string): Payload => {
    //                    ->                          Payload type extends JwtPayload
    const payload = verify(token, this.#secretKey) as Payload | string;
    if (typeof payload === 'string') throw new Error('Verify token failed');
    return payload;
  };
}
