import { NextFunction, Response, Request } from "express";
import catchAsync from "../utils/catchAsync";
import Room from "../model/Room";
import DevUnityError from "../utils/DevUnityError";
import Discussion from "../model/Discussion";
import User from "../model/User";
import { IPopulatedUsersProject, IRoom } from "../types/types";
import DevUnityRes from "../utils/DevUnityRes";
import { Types } from "mongoose";

export const createRoom = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // INFO:  roomId is uuid4()
    const { roomId } = req.params;
    const { password, title } = req.body;
    if (!roomId || !password || !title)
      return next(
        new DevUnityError(
          400,
          "Please provide a roomId, password and name to proceed.",
        ),
      );

    // checking if room id contains space (blankcharacter)
    const validation = roomId.split(" ").length > 1;
    if (validation)
      return next(new DevUnityError(400, "RoomId can not contain any space."));
    // checking if provided id is unique or not
    const isExist = await Room.exists({ roomId });
    if (isExist)
      return next(
        new DevUnityError(400, "Room id is already taken by someone else."),
      );
    const user = req.user;
    if (!user)
      return next(
        new DevUnityError(
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
      project: {
        title,
        lang: "js",
      },
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
    user.rooms.push(room._id as Types.ObjectId & IPopulatedUsersProject);
    await user.save();
    new DevUnityRes(res, 201, "Room Created!", room.roomId).send();
  },
);

export const getRoom = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // INFO: roomId is uuid
    const { roomId } = req.params;
    if (!roomId) return next(new DevUnityError(400, "RoomId not found!"));

    let { query: mode } = req.query;
    if (!mode) mode = "r";

    const user = req.user;
    if (!user)
      return next(
        new DevUnityError(
          401,
          "It seems like you are unauthenticated, Please login first.",
        ),
      );

    let room = await Room.findOne({ roomId })
      .populate({
        model: User,
        path: "admin",
        select: "_id username avatar.secure_url",
      })
      .populate({
        model: User,
        path: "participents",
        select: "_id username avatar.secure_url",
      });

    if (!room)
      return next(
        new DevUnityError(400, "No such room available with this id."),
      );

    if (mode === "r") {
      // responding limited data to preview
      room = await Room.findOne({ roomId })
        .select("-project.code -discussion")
        .populate({
          model: User,
          path: "admin",
          select: "_id username avatar.secure_url",
        })
        .populate({
          model: User,
          path: "participents",
          select: "_id username avatar.secure_url",
        });
    } else if (mode === "rwx") {
      if (!room.activeUsers.includes(user._id)) {
        room = await Room.findOne({ roomId })
          .select("-project.code -discussion")
          .populate({
            model: User,
            path: "admin",
            select: "_id username avatar.secure_url",
          })
          .populate({
            model: User,
            path: "participents",
            select: "_id username avatar.secure_url",
          });
      } else if (user._id.toString() === room.admin._id.toString()) {
        room = await Room.findOne({ roomId })
          .select("+password")
          .populate({
            model: User,
            path: "admin",
            select: "_id username avatar.secure_url",
          })
          .populate({
            model: User,
            path: "participents",
            select: "_id username avatar.secure_url",
          });
      }
    } else {
      return new DevUnityError(400, "It seems like the url is infected.");
    }
    new DevUnityRes(res, 200, undefined, room).send();
  },
);

export const joinRoom = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // INFO:  roomId is uuid4()
    const { roomId } = req.params;
    if (!roomId) return next(new DevUnityError(400, "Please provide roomId."));

    const { password } = req.query;
    const user = req.user;
    if (!user)
      return next(
        new DevUnityError(
          401,
          "It seems like you are unauthenticated, Please login first.",
        ),
      );
    // if admin tries to joinRoom he/she can join without password
    const _room: IRoom | null = await Room.findOne({ roomId, admin: user._id });
    // make his join without password

    if (_room) {
      // adding to active users
      await _room.updateOne({ $addToSet: { activeUsers: user._id } });
      // sending response
      return new DevUnityRes(
        res,
        200,
        `Welcome admin, ${user.username}`,
        roomId,
      ).send();
    }
    if (!password)
      return next(
        new DevUnityError(
          400,
          "Please provide password since you are not owner of the room.",
        ),
      );

    const room: IRoom | null = await Room.findOne({
      roomId,
      password,
    });

    if (!room)
      return next(
        new DevUnityError(
          401,
          "It seems like the roomId or the password is wrong.",
        ),
      );

    // find if new participent
    if (!room.participents.includes(user._id)) {
      // new user in the room
      // add room id in userModel and participent_id in roomModel
      room.participents.push(user._id);
      user.rooms.push(room._id as Types.ObjectId & IPopulatedUsersProject);
      await room.save();
      await user.save();
    }
    // setting the user in active state
    await room.updateOne({ $addToSet: { activeUsers: user._id } });
    new DevUnityRes(res, 200, `Welcome ${user.username}`, roomId).send();
  },
);

export const deleteRoom = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // INFO: roomId is _id
    const { roomId } = req.params;
    if (!roomId) return next(new DevUnityError(400, "RoomId not found!"));
    const user = req.user;
    if (!user)
      return next(
        new DevUnityError(
          401,
          "It seems like you are unauthenticated, Please login first.",
        ),
      );
    const room = await Room.findOne({ _id: roomId, admin: user._id });
    if (!room)
      return next(
        new DevUnityError(
          400,
          "Either you're not admin of the room or just room doesn't exist with given id.",
        ),
      );
    await Room.deleteOne({ _id: room._id });
    new DevUnityRes(res, 200, "Room Deleted", true).send();
  },
);
export const updateRoom = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { description, title, explanation } = req.body;
    if (!description && !title && !explanation)
      return next(
        new DevUnityError(400, "Provide at least one field to update."),
      );
    // INFO: roomId is uuid
    const { roomId } = req.params;
    if (!roomId) return next(new DevUnityError(400, "RoomId not found!"));
    const user = req.user;
    if (!user)
      return next(
        new DevUnityError(
          401,
          "It seems like you are unauthenticated, Please login first.",
        ),
      );
    const room = await Room.findOne({ roomId, admin: user._id });
    if (!room)
      return next(
        new DevUnityError(
          400,
          "Either you're not admin of the room or just room doesn't exist with given id.",
        ),
      );
    await room.updateOne({
      "project.description": description,
      "project.title": title,
      "project.explanation": explanation,
    });
    new DevUnityRes(res, 200, "Room updated.", true).send();
  },
);
export const allRooms = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ownerId } = req.params;
    if (!ownerId)
      return next(
        new DevUnityError(
          400,
          "Please provide ownerId to get his/her all rooms.",
        ),
      );
    const rooms = await Room.find({ admin: ownerId })
      .populate({
        model: User,
        path: "admin",
        select: "_id username avatar.secure_url",
      })
      .populate({
        model: User,
        path: "participents",
        select: "_id username avatar.secure_url",
      });
    if (!rooms)
      return next(
        new DevUnityError(
          500,
          "Couldn't find rooms at the moment. Please try again later.",
        ),
      );
    new DevUnityRes(res, 200, undefined, rooms).send();
  },
);
export const searchRoom = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let { page, size } = req.query;
    const { ownerId } = req.query;
    const { query } = req.params;
    if (!page) page = "1";
    if (!size) size = "10";

    const skipAmount =
      (parseInt(page as string) - 1) * parseInt(size as string);
    // forming query
    const searchQuery = query
      ? {
          admin: ownerId,
          $or: [
            {
              "project.title": { $regex: new RegExp(query, "i") },
            },
            {
              "project.explanation": { $regex: new RegExp(query, "i") },
            },
            {
              "project.lang": { $regex: new RegExp(query, "i") },
            },
          ],
        }
      : { admin: ownerId };

    // if owner-id isnt there then deleting admin field from the searchQuery
    if (!ownerId) delete searchQuery.admin;
    const rooms = await Room.find(searchQuery)
      .populate({
        model: User,
        path: "admin",
        select: "_id username avatar.secure_url",
      })
      .populate({
        model: User,
        path: "participents",
        select: "_id username avatar.secure_url",
      })
      .skip(skipAmount)
      .sort({ createdAt: -1 })
      .limit(parseInt(size as string));

    if (!rooms)
      return next(new DevUnityError(500, "No user found w/ this query."));
    const totalDocuments = await Room.countDocuments(searchQuery);
    const isNext = totalDocuments > skipAmount + rooms.length;
    new DevUnityRes(res, 200, undefined, { isNext, rooms }).send();
  },
);

// update password or/and language
export const updatePassAndLang = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { password, lang } = req.body;
    if (!password && !lang)
      return next(
        new DevUnityError(400, "Provide at least one field to update."),
      );
    // INFO: roomId is uuid
    const { roomId } = req.params;
    if (!roomId) return next(new DevUnityError(400, "RoomId not found!"));
    const user = req.user;
    if (!user)
      return next(
        new DevUnityError(
          401,
          "It seems like you are unauthenticated, Please login first.",
        ),
      );
    const room = await Room.findOne({ roomId, admin: user._id });
    if (!room)
      return next(
        new DevUnityError(
          400,
          "Either you're not admin of the room or just room doesn't exist with given id.",
        ),
      );
    if (lang) {
      room.project.lang = lang;
    }
    if (password) {
      if (password.trim().length >= 6) {
        room.password = password;
      } else {
        new DevUnityError(401, "Password must contain at least 6 characters.");
      }
    }
    await room.save();
    new DevUnityRes(res, 200, "Room updated.", true).send();
  },
);

export const saveCode = catchAsync(async (req, res, next) => {
  const { roomId } = req.params;
  if (!roomId)
    return next(new DevUnityError(400, "Please provide a roomid to proceed."));

  const { code } = req.body;

  const user = req.user;
  if (!user)
    return next(
      new DevUnityError(401, "It seems like you're unauthenticated."),
    );

  const room: IRoom | null = await Room.findOne({ roomId });
  if (!room)
    return next(new DevUnityError(400, "Room not found with provided Id."));

  if (!room.activeUsers.includes(user._id))
    return next(
      new DevUnityError(401, "You must join the room to save the code."),
    );

  room.project.code = code;
  await room.save();

  new DevUnityRes(res, 200, "Code saved!").send();
});
