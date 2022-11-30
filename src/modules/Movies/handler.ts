import { Request, Response } from "express";
//import any DB handler

export class MoviesHandler {
  /*
  #dbConn;

  constructor() {
    this.#dbConn = dbConn; 
  }
  */

  async getOne(_req: Request, res: Response): Promise<void> {
    res.send("get one");
  }
  async getAll(_req: Request, res: Response): Promise<void> {
    res.send("get all");
  }
  async createOne(_req: Request, res: Response): Promise<void> {
    res.send("create one");
  }
  async updateOne(_req: Request, res: Response): Promise<void> {
    res.send("update One");
  }
  async deleteOne(_req: Request, res: Response): Promise<void> {
    res.send("delete one");
  }
}
