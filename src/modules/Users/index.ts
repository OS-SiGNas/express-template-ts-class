import UsersRouter from './users_router';
import UsersController from './users_controller';
import UserService from './users_service';
import AuthSerice from './auth_service';
import UsersMiddleware from './users_middlewares';

import config from '../../config';
import { UserModel } from './users_model';
import { httpResponse, schemaValidator } from '../shared';
import { userSchemas } from './users_schemas';

const userService = new UserService(UserModel);
const { generateJwt, verifyJwt } = new AuthSerice(config.jwtSecretKey);
const usersController = new UsersController({ httpResponse, userService, generateJwt });
export const { checkSession } = new UsersMiddleware(verifyJwt);

// Module User
export default new UsersRouter({ usersController, checkSession, schemaValidator, userSchemas }).router;
