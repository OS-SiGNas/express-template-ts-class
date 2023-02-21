import type { Router, ErrorRequestHandler } from 'express';

export type Rol = 'admin' | 'dev' | 'audit' | 'user';

export type Modules = Array<Router | ErrorRequestHandler>;
