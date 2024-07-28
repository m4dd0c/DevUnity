import { NextFunction, Response, Request } from "express";
import catchAsync from "../utils/catchAsync";

export const createRoom = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);
export const getRoom = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);
export const deleteRoom = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);
export const createDescription = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);
export const editDescription = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);
