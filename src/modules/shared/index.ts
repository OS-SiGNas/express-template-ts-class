import ValidatorMiddleware from './SchemaValidatorMiddleware';
import HttpResponse from './HttpResponse';
import config from '../../config';

export const httpResponse = new HttpResponse(config.environment === 'dev');
export const { schemaValidator } = new ValidatorMiddleware(httpResponse);
