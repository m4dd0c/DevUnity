import { Schema, model } from "mongoose";
import { IRoom } from "../types/types";
import Discussion from "./Discussion";
import User from "./User";
import DevUnityError from "../utils/DevUnityError";

const roomSchema = new Schema<IRoom>(
  {
    project: {
      title: {
        type: String,
        default: "Untitled",
        trim: true,
        minlength: 3,
        maxlength: 32,
      },
      explanation: {
        type: String,
        trim: true,
        maxlength: 150,
      },
      description: {
        type: String,
        maxlength: 5000,
        default: "",
      },
      lang: {
        type: String,
        enum: ["js", "java", "py", "cpp", "c", "php"],
        default: "js",
        required: true,
      },
      code: {
        type: String,
        // max-line of code would be ~1500 lines. considering 100 letters in a line
        maxlength: 150000,
      },
    },
    roomId: {
      type: String,
      required: true,
      minlength: [8, "RoomId must have contain at least 8 characters."],
      maxlength: [100, "RoomId can contain at most 32 characters."],
      trim: true,
      unique: true,
      lowercase: true,
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    participents: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    activeUsers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    discussion: {
      type: Schema.Types.ObjectId,
      ref: "Discussion",
    },
    password: {
      type: String,
      required: true,
      select: false,
      trim: true,
      maxlength: [100, "Room password must contain at most 100 characters."],
      minlength: [6, "Room password must contain at least 6 characters."],
    },
  },
  { timestamps: true },
);
// deleting corresponding discussion before deleting room
roomSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      const room_id = this._id;

      const discussions = await Discussion.deleteOne({ room: room_id });
      if (!discussions)
        return next(
          new DevUnityError(
            400,
            "Couldn't delete associated discussion due to some issue.",
          ),
        );

      const user = await User.updateMany(
        { rooms: room_id },
        { $pull: { rooms: room_id } },
      );

      if (user) next();
    } catch (error) {
      console.log(error);
    }
  },
);

const Room = model<IRoom>("Room", roomSchema);
export default Room;
