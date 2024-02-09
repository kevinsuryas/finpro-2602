import { NextFunction, Request, Response } from 'express';

export const sample = (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello, World")
}