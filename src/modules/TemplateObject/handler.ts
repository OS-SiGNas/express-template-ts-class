import { Request, Response } from "express";

export class TemplateObcect {
  /* TODO
  #db:dbObject;

  constructor(db:dbObject) {
    this.#db = db;
  }
  */

  async asyncMethod(req: Request, res: Response): Promise<void> {
    console.log(`Any Async Method ${req.header}`);
    // TODO any async call
    res.status(200).json({
      message: "TemplateObcect with any async method",
    });
  }

  syncMethod(req: Request, res: Response) {
    console.log(`Any Sync Method ${req.header}`);
    res.status(200).json({
      message: "TemplateObcect with any sync method",
    });
  }
}
