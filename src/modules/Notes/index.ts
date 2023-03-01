import { Router } from 'express';
import { schemaValidator } from '../shared/schemaValidator';
import { notesSchemas } from './notes_schemas';
import { NotesController } from './notes_controller';
import { checkSession } from '../Users/users_middlewares';
import { httpResponse } from '../shared/httpResponse';

import type { RequestHandler } from 'express';
import type { AnyZodObject } from 'zod';
import type { NotesSchemas } from './notes_schemas';
import type { HttpResponse } from '../shared/httpResponse';
import type { Rol } from '../types';

interface Dependences {
  httpResponse: HttpResponse;
  checkSession: (arg: Rol) => RequestHandler;
  schemaValidator: (arg: AnyZodObject) => RequestHandler;
  notesSchemas: NotesSchemas;
}

class NotesRouter extends NotesController {
  readonly #router: Router;
  constructor({ httpResponse, checkSession, schemaValidator, notesSchemas }: Dependences) {
    super(httpResponse);

    const { getNoteSchema, getNotesSchema, postNoteSchema, putNoteSchema, deleteNoteSchema } = notesSchemas;

    this.#router = Router();

    this.#router
      .use(checkSession('user'))

      .get('/notes/', schemaValidator(getNoteSchema), this.getNote)
      .get('/notes/:_id', schemaValidator(getNotesSchema), this.getNotes)
      .post('/notes', schemaValidator(postNoteSchema), this.postNote)
      .put('/notes/:_id', schemaValidator(putNoteSchema), this.putNote)
      .delete('/notes/:_id', schemaValidator(deleteNoteSchema), this.deleteNote);
  }

  get router(): Router {
    return this.#router;
  }
}

export default new NotesRouter({ httpResponse, checkSession, schemaValidator, notesSchemas }).router;
