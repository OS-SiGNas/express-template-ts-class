import { randomUUID } from 'node:crypto';
import { styleText } from 'node:util';
import { Logger } from '../../../../Applications/shared/logger-handler/make.js';

import type { RequestHandler } from 'express';

const httpLogger = new Logger('Request');

const sMethod = (method: string) => styleText(['bold', 'bgWhite', 'black'], `[${method}]`);
const sUrl = (url: string) => styleText('cyan', `${url}`);
const sUuid = (uuid: string) => styleText('green', `'${uuid}'`);
const sIp = (ip?: string) => styleText('red', `'${ip}'`);
const sCode = (code: number) => styleText('bold', `${code}`);

export const requestLogger: RequestHandler = ({ headers, ip, method, url }, res, next) => {
  const uuid = randomUUID();
  headers.uuid = uuid;
  res.setHeader('X-Request-ID', uuid);
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    httpLogger.info(`
			${sUuid(uuid)} from ${sIp(ip)}
			${sMethod(method)} - ${sUrl(url)}
			${sCode(res.statusCode)} - ${duration}ms`);
  });

  return next();
};
