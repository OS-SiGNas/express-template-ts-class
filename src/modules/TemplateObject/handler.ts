import { Request, Response } from "express";

export class TemplateObject {
  /* TODO
  #db:dbObject;

  constructor(db:dbObject) {
    this.#db = db;
  }
  */

  async asyncMethod(req: Request, res: Response): Promise<void> {
    try {
      console.log(`Any Async Method ${req.header}`);
      // TODO any async call
      res.status(200).json({
        message: "TemplateObcect with any async method",
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  syncMethod(): string {
    return `Any Sync Method`;
  }
}
