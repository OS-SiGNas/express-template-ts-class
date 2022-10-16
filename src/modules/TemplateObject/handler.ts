import { Request, Response } from "express";

export class TemplateObcect {
  async asyncMethod(req: Request, res: Response): Promise<void> {
    console.log(`Any Async Method ${req.header}`);
    res.status(200).json({
      message: "TemplateObcect with any async method",
    });
  }
  syncMethod() {
    console.log("Any Method");
  }
}
