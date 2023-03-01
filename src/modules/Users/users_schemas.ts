import { type AnyZodObject, z } from 'zod';

export class UserSchemas {
  loginSchema: AnyZodObject;
  createUserSchema: AnyZodObject;
  updateUserSchema: AnyZodObject;
  getOneUserSchema: AnyZodObject;
  deleteUserSchema: AnyZodObject;
  constructor() {
    this.loginSchema = z.object({
      body: z.object({
        username: z.string().min(1, 'username can`t be empty'),
        password: z.string().min(10, 'Password need minimun 10 chars'),
      }),
    });

    this.createUserSchema = z.object({
      body: z.object({
        username: z.string(),
        password: z.string().min(10, 'Password need minimun 10 chars'),
        email: z.string().email(),
        name: z.string(),
        telf: z.string(),
        active: z.boolean(),
        roles: z.array(z.enum(['admin', 'dev', 'audit', 'user'])),
      }),
    });

    this.updateUserSchema = z.object({
      body: z.object({
        username: z.string().optional(),
        password: z.string().min(10, 'Password need minimun 10 chars').optional(),
        email: z.string().email().optional(),
        name: z.string().optional(),
        telf: z.string().optional(),
        active: z.boolean().optional(),
        roles: z.array(z.enum(['admin', 'dev', 'audit', 'user'])).optional(),
      }),
      params: z.object({ _id: z.string().length(24, 'id must be a 24 hex characters') }),
    });

    this.getOneUserSchema = z.object({
      params: z.object({ _id: z.string().length(24, 'id must be a 24 hex characters') }),
    });

    this.deleteUserSchema = z.object({
      params: z.object({ _id: z.string().length(24, 'id must be a 24 hex characters') }),
    });
  }
}

export const userSchemas = new UserSchemas();
