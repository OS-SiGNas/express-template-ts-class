import { Router } from 'express';
import UsersRouter from './classes/UsersRouter';
import UsersController from './classes/UsersController';
import UsersService from './classes/UsersService';
import UsersModel from './classes/UsersModel';
import AuthSerice from './classes/AuthService';
import AuthMiddleware from './classes/AuthMiddleware';
import SchemaValidatorMiddleware from '../shared/SchemaValidatorMiddleware';

import { jwtSecretKey, jwtSignOptions } from '../../server/Settings';
import { usersSchema } from './classes/UsersSchema';
import httpResponse from '../shared/HttpResponse';

const { generateJwt, verifyJwt } = new AuthSerice(jwtSecretKey, jwtSignOptions);
const { checkSession } = new AuthMiddleware(httpResponse, verifyJwt);
const { schemaValidator } = new SchemaValidatorMiddleware(httpResponse);

const service = new UsersService(UsersModel);
const controller = new UsersController({ httpResponse, service, generateJwt });

// Module User Router
export default new UsersRouter({ router: Router(), controller, checkSession, schemaValidator, usersSchema }).router;
