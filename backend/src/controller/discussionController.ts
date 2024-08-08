import { NextFunction, Response, Request } from "express";
import catchAsync from "../utils/catchAsync";
import Room from "../model/Room";
import CollabriteError from "../utils/CollabriteError";
import Discussion from "../model/Discussion";
import CollabriteRes from "../utils/CollabriteRes";

export const getDiscussion = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { discussionId } = req.params;
    if (!discussionId)
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
    const discussion = await Discussion.findById(discussionId);
    if (!discussion)
      return next(
        new CollabriteError(500, "No discussion available w/ this id."),
      );
    new CollabriteRes(res, 200, undefined, discussion).send();
  },
);
export const updateDiscussion = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // const { discussionId } = req.params;
    // if (!discussionId)
    //   return next(
    //     new CollabriteError(400, "Please provide roomId to proceed."),
    //   );
    // const user = req.user;
    // if (!user)
    //   return next(
    //     new CollabriteError(
    //       401,
    //       "It seems like you are unauthenticated. Please login.",
    //     ),
    //   );
    // const discussion = await Discussion.findById(discussionId);
    // if (!discussion)
    //   return next(
    //     new CollabriteError(500, "No discussion available w/ this id."),
    //   );
    new CollabriteRes(res, 200, "Yet to build").send();
  },
);
