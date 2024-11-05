import { RequestHandler } from 'express';
import { someone } from './someone.js';

export const v1: RequestHandler[] = [someone];
