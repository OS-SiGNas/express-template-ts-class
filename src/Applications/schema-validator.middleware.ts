import { responseHandler } from './response-handler/make';

import type { AnyZodObject } from 'zod';
import type { RequestHandler } from 'express';

type SchemaValidator = (shema: AnyZodObject) => RequestHandler;

export const schemaValidator: SchemaValidator = (schema) => async (req, res, next) => {
  try {
    const { query, params, body } = await schema.parseAsync({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    req.body = body;
    req.params = params;
    req.query = query;

    return next();
  } catch (error) {
    res.status(422).json(responseHandler.http({ error }));
  }
};
