import { NextFunction, Request, Response } from "express";

const catchAsync =
  (func: (req: Request, res: Response, next: NextFunction) => void) =>
  (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(func(req, res, next)).catch(next);
  };
export default catchAsync;
