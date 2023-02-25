import type { Request, Response } from 'express';
import type { HttpResponse } from '../shared/httpResponse';

export abstract class NotesController {
  readonly #response: HttpResponse;
  constructor(httpResponse: HttpResponse) {
    this.#response = httpResponse;
  }

  protected getNote = async (_req: Request, res: Response): Promise<Response> => {
    return this.#response.ok(res, 'notes :D');
  };

  protected getNotes = async (_req: Request, res: Response): Promise<Response> => {
    return this.#response.ok(res, 'notes :D');
  };

  protected postNote = async (_req: Request, res: Response): Promise<Response> => {
    return this.#response.ok(res, 'notes :D');
  };

  protected putNote = async (_req: Request, res: Response): Promise<Response> => {
    return this.#response.ok(res, 'notes :D');
  };

  protected deleteNote = async (_req: Request, res: Response): Promise<Response> => {
    return this.#response.ok(res, 'notes :D');
  };
}
