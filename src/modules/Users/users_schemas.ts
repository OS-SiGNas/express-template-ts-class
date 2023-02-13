import { z } from 'zod';

export type loginType = z.infer<typeof loginSchema>['body'];

export type userSchemaType = z.infer<typeof userSchema>['body'];
export type updateUserSchemaBodyType = z.infer<typeof userSchema>['body'];
export type updateUserSchemaParamsType = z.infer<typeof updateUserSchema>['params'];

export const loginSchema = z.object({
  body: z.object({
    username: z.string(),
    password: z.string().min(10, 'Password need 10 chars'),
  }),
});

export const userSchema = z.object({
  body: z.object({
    username: z.string(),
    password: z.string(),
    email: z.string().email(),
    name: z.string(),
    telf: z.string(),
    active: z.boolean(),
    rol: z.array(z.enum(['admin', 'dev', 'audit', 'user'])),
  }),
});

export const updateUserSchema = z.object({
  body: z.object({
    username: z.string().optional(),
    password: z.string().optional(),
    email: z.string().email().optional(),
    name: z.string().optional(),
    telf: z.string().optional(),
    active: z.boolean().optional(),
    rol: z.array(z.enum(['admin', 'dev', 'audit', 'user'])).optional(),
  }),
  params: z.object({ _id: z.string() }),
});
