import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

export const bodyValidator =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
    } catch (error) {
      res.status(422).json({ error });
      return;
    }
    next();
  };
