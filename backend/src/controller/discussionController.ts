import { NextFunction, Response, Request } from "express";
import mongoose from "mongoose";
import catchAsync from "../utils/catchAsync";
import Room from "../model/Room";
import CollabriteError from "../utils/CollabriteError";
import Discussion from "../model/Discussion";
import CollabriteRes from "../utils/CollabriteRes";
import User from "../model/User";
import { IMessage, IRoom } from "../types/types";

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
    const { chat } = req.body;

    if (!roomId || !chat)
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

    // since we are sending the whole chat
    // but before that changing chat structure (req.body chat has populated fields, we must removed them first)
    const discussionLastIdx = discussion.chat.length - 1;
    if (
      // if db chat < req.body chat then only saving it
      discussionLastIdx + 1 < chat.length &&
      // further checking if last message in db chat is present at the same index of req.body chat
      chat[discussionLastIdx].message ===
        discussion.chat[discussionLastIdx].message
    ) {
      // getting un-saved chat
      const newChat = chat.slice(discussionLastIdx + 1);
      // appending 'em one-by-one
      newChat.forEach((chat: IMessage) => {
        discussion.chat.push({
          message: chat.message,
          sender: new mongoose.Types.ObjectId(chat.sender._id),
        });
      });
      // saving what-so-ever is changed
      await discussion.save();
    }
    new CollabriteRes(res, 200).send();
  },
);
