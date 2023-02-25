import { type AnyZodObject, z } from 'zod';

export class NotesSchemas {
  getNoteSchema: AnyZodObject;
  getNotesSchema: AnyZodObject;
  postNoteSchema: AnyZodObject;
  putNoteSchema: AnyZodObject;
  deleteNoteSchema: AnyZodObject;
  constructor() {
    this.getNoteSchema = z.object({
      params: z.object({ _id: z.string().length(24, 'id must be a 24 hex characters') }),
    });
    this.getNotesSchema = z.object({ body: z.object({}) });
    this.postNoteSchema = z.object({
      body: z.object({
        _id: z.number(),
        name: z.string(),
        description: z.string(),
        content: z.string(),
        createAt: z.date(),
      }),
    });
    this.putNoteSchema = z.object({
      body: z.object({}),
      params: z.object({ _id: z.string().length(24, 'id must be a 24 hex characters') }),
    });
    this.deleteNoteSchema = z.object({
      params: z.object({ _id: z.string().length(24, 'id must be a 24 hex characters') }),
    });
  }
}

export const notesSchemas = new NotesSchemas();
