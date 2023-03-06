import type { Request, Response } from 'express';
import type HttpResponse from '../shared/HttpResponse';

export default class NotesController {
  readonly #response: HttpResponse;
  constructor(httpResponse: HttpResponse) {
    this.#response = httpResponse;
  }

  getNote = async (_req: Request, res: Response): Promise<Response> => {
    return this.#response.ok(res, 'notes :D');
  };

  getNotes = async (_req: Request, res: Response): Promise<Response> => {
    return this.#response.ok(res, 'notes :D');
  };

  postNote = async (_req: Request, res: Response): Promise<Response> => {
    return this.#response.ok(res, 'notes :D');
  };

  putNote = async (_req: Request, res: Response): Promise<Response> => {
    return this.#response.ok(res, 'notes :D');
  };

  deleteNote = async (_req: Request, res: Response): Promise<Response> => {
    return this.#response.ok(res, 'notes :D');
  };
}
