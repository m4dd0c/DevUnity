import { NextFunction, Response, Request } from "express";
import catchAsync from "../utils/catchAsync";
import Room from "../model/Room";
import CollabriteError from "../utils/CollabriteError";
import Discussion from "../model/Discussion";
import CollabriteRes from "../utils/CollabriteRes";
import User from "../model/User";
import { IRoom } from "../types/types";

export const getDiscussion = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { roomId } = req.params;
    if (!roomId)
      return next(
        new CollabriteError(400, "Please provide roomId to proceed."),
      );
    const user = req.user;
    if (!user)
      return next(
        new CollabriteError(
          401,
          "It seems like you are unauthenticated. Please login.",
        ),
      );
    const discussion = await Discussion.findOne({ room: roomId }).populate({
      model: User,
      path: "chat.sender",
      select: "_id username avatar.secure_url",
    });
    if (!discussion)
      return next(
        new CollabriteError(500, "No discussion available w/ this id."),
      );
    new CollabriteRes(res, 200, undefined, discussion).send();
  },
);
export const updateDiscussion = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { roomId } = req.params;
    const { msg } = req.body;

    console.log(msg, roomId);
    if (!roomId || !msg)
      return next(new CollabriteError(400, "Please provide a message."));

    const user = req.user;
    if (!user)
      return next(
        new CollabriteError(
          401,
          "It seems like you are unauthenticated. Please login.",
        ),
      );

    const room: IRoom | null = await Room.findOne({ roomId });
    if (!room)
      return next(new CollabriteError(500, "No room available w/ this id."));

    // check if user is a participent then only can send message
    if (!room.participents.includes(user._id)) {
      return next(
        new CollabriteError(401, "Only participents can send messages."),
      );
    }

    const discussion = await Discussion.findById(room.discussion);
    if (!discussion)
      return next(
        new CollabriteError(
          400,
          "No discussion found with given discussionId.",
        ),
      );

    // pushing message
    discussion.chat.push({
      message: msg,
      sender: user._id,
    });

    await discussion.save();
    new CollabriteRes(res, 200).send();
  },
);
