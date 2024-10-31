import { httpServer } from './gateway/http/index.js';
import type { IServer } from '../Domain/IServer';

export const servers: IServer[] = [httpServer];
