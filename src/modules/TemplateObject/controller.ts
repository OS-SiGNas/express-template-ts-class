import { Request, Response } from "express";

export class TemplateObject {
  async asyncMethod(req: Request, res: Response): Promise<void> {
    try {
      console.log(`Any Async Method ${req.header}`);
      // TODO any async call
      res.status(200).json({
        message: "TemplateObcect with any async method",
      });
    } catch (error) {
      console.log(error);
    }
  }

  syncMethod(): string {
    return `Any Sync Method`;
  }
}
