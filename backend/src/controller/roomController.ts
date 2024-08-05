import { NextFunction, Response, Request } from "express";
import catchAsync from "../utils/catchAsync";
import Room from "../model/Room";
import CollabriteError from "../utils/CollabriteError";
import CollabriteRes from "../utils/CollabriteRes";
import Discussion from "../model/Discussion";

export const createRoom = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // INFO:  roomId is uuid4()
    const { roomId } = req.params;
    const { password } = req.body;
    if (!roomId || !password)
      return next(
        new CollabriteError(
          400,
          "Please provide a roomId and password to proceed.",
        ),
      );

    // checking if room id contains space (blankcharacter)
    const validation = roomId.split(" ").length > 1;
    if (validation)
      return next(
        new CollabriteError(400, "RoomId can not contain any space."),
      );
    const user = req.user;
    if (!user)
      return next(
        new CollabriteError(
          401,
          "It seems like you are unauthenticated, Please login first.",
        ),
      );
    // creating user if not already exist
    const room = await Room.create({
      roomId,
      admin: user._id,
      participents: [user._id],
      password,
    });
    // creating a discussion
    const discussion = await Discussion.create({
      room: room._id,
      admin: user._id,
      chat: [
        {
          message: "Hey fellows, Feel free to discuss project.",
          sender: user._id,
        },
      ],
    });
    room.discussion = discussion._id;
    await room.save();
    user.rooms.push(room._id);
    await user.save();
    new CollabriteRes(res, 201, "Room Created!", room).send();
  },
);

export const getRoom = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // INFO: roomId is _id
    const { roomId } = req.params;
    if (!roomId) return next(new CollabriteError(400, "RoomId not found!"));
    const user = req.user;
    if (!user)
      return next(
        new CollabriteError(
          401,
          "It seems like you are unauthenticated, Please login first.",
        ),
      );

    let room = await Room.findById(roomId);
    if (!room)
      return next(
        new CollabriteError(400, "No such room available with this id."),
      );
    // if user is room owner then sending password field as well
    if (user._id.toString() === room.admin.toString()) {
      room = await Room.findById(roomId).select("+password");
    }
    if (!room)
      return next(
        new CollabriteError(400, "No such room available with this id."),
      );
    new CollabriteRes(res, 200, undefined, room).send();
  },
);
// TODO: after socket i guess
export const joinRoom = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // INFO:  roomId is uuid4()
    const { roomId } = req.params;
    const { password } = req.query;
    if (!roomId || !password)
      return next(
        new CollabriteError(400, "Please provide roomId as well as password."),
      );
    const user = req.user;
    if (!user)
      return next(
        new CollabriteError(
          401,
          "It seems like you are unauthenticated, Please login first.",
        ),
      );
    const room = await Room.findOne({ roomId, password });
    if (!room)
      return next(
        new CollabriteError(400, "No such room available with this id."),
      );
    // find if already a participent (re-sync)
    if (room.participents.includes(user._id)) {
      // return the room only TODO:
      return new CollabriteRes(
        res,
        200,
        `Welcome back, ${user.username}`,
        room,
      ).send();
    }
    // new user in the room
    // add room id in user and participent id in room model
    else {
      room.participents.push(user._id);
      user.rooms.push(room._id);
      await room.save();
      await user.save();
    }
    new CollabriteRes(res, 200, `Welcome ${user.username}`, room).send();
  },
);

export const deleteRoom = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // INFO: roomId is _id
    const { roomId } = req.params;
    if (!roomId) return next(new CollabriteError(400, "RoomId not found!"));
    const user = req.user;
    if (!user)
      return next(
        new CollabriteError(
          401,
          "It seems like you are unauthenticated, Please login first.",
        ),
      );
    const room = await Room.findOne({ _id: roomId, admin: user._id });
    if (!room)
      return next(
        new CollabriteError(
          400,
          "Either you're not admin of the room or just room doesn't exist with given id.",
        ),
      );
    await Room.deleteOne({ _id: room._id });
    new CollabriteRes(res, 200, "Room Deleted", room).send();
  },
);
export const updateRoom = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { description, title, slogan, code, lang } = req.body;
    if (!description && !title && !slogan && !code && !lang)
      return next(
        new CollabriteError(400, "Provide at least one field to update."),
      );
    // INFO: roomId is _id
    const { roomId } = req.params;
    if (!roomId) return next(new CollabriteError(400, "RoomId not found!"));
    const user = req.user;
    if (!user)
      return next(
        new CollabriteError(
          401,
          "It seems like you are unauthenticated, Please login first.",
        ),
      );
    const room = await Room.findOne({ _id: roomId, admin: user._id });
    if (!room)
      return next(
        new CollabriteError(
          400,
          "Either you're not admin of the room or just room doesn't exist with given id.",
        ),
      );
    await room.updateOne({
      project: {
        description,
        code,
        lang,
        title,
        slogan,
      },
    });
    new CollabriteRes(res, 200, "Room updated successfully.").send();
  },
);
export const allRooms = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user)
      return next(
        new CollabriteError(
          401,
          "It seems like you are unauthenticated. Please login.",
        ),
      );
    const { ownerId } = req.params;
    if (!ownerId)
      return next(
        new CollabriteError(
          400,
          "Please provide ownerId to get his/her all rooms.",
        ),
      );
    const rooms = await Room.find({ admin: ownerId });
    if (!rooms)
      return next(
        new CollabriteError(
          500,
          "Couldn't find rooms at the moment. Please try again later.",
        ),
      );
    new CollabriteRes(res, 200, undefined, rooms).send();
  },
);
