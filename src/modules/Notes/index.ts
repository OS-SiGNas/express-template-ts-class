import NotesRouter from './notes_router';
import NotesController from './notes_controller';

import { httpResponse, schemaValidator } from '../shared';
import { checkSession } from '../Users';
import { notesSchemas } from './notes_schemas';

const notesController = new NotesController(httpResponse);

export default new NotesRouter({ notesController, checkSession, schemaValidator, notesSchemas }).router;
