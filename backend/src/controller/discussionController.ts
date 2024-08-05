import { NextFunction, Response, Request } from "express";
import catchAsync from "../utils/catchAsync";
import Room from "../model/Room";

export const getDiscussion = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { roomId } = req.params;
    const room = Room.findOne({ roomId });
    // const chatId = room.discussion;
  },
);
export const updateDiscussion = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);
export const deleteDiscussion = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);
