import { Router } from 'express';

import type NotesController from './notes_controller';
import type { RequestHandler } from 'express';
import type { AnyZodObject } from 'zod';
import type { NotesSchemas } from './notes_schemas';
import type { Rol } from '../Users/types';
interface Dependences {
  notesController: NotesController;
  checkSession: (arg: Rol) => RequestHandler;
  schemaValidator: (arg: AnyZodObject) => RequestHandler;
  notesSchemas: NotesSchemas;
}

export default class NotesRouter {
  readonly #router: Router;
  constructor({ notesController, checkSession, schemaValidator, notesSchemas }: Dependences) {
    const { getNote, getNotes, postNote, putNote, deleteNote } = notesController;
    const { getNoteSchema, getNotesSchema, postNoteSchema, putNoteSchema, deleteNoteSchema } = notesSchemas;

    this.#router = Router();

    this.#router
      // Protected Routes by middleware
      .use('/notes/', checkSession('user'))

      .get('/notes/', schemaValidator(getNoteSchema), getNote)
      .get('/notes/:_id', schemaValidator(getNotesSchema), getNotes)
      .post('/notes', schemaValidator(postNoteSchema), postNote)
      .put('/notes/:_id', schemaValidator(putNoteSchema), putNote)
      .delete('/notes/:_id', schemaValidator(deleteNoteSchema), deleteNote);
  }

  get router(): Router {
    return this.#router;
  }
}
