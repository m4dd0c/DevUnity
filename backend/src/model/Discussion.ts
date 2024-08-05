import { Schema, model } from "mongoose";
import { IDiscussion } from "../types/types";

const discussionSchema = new Schema<IDiscussion>(
  {
    room: {
      type: Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    chat: [
      {
        message: {
          type: String,
          trim: true,
          required: true,
          maxlength: 100,
          minlength: 1,
        },
        sender: { required: true, type: Schema.Types.ObjectId, ref: "User" },
      },
    ],
  },
  { timestamps: true },
);

const Discussion = model<IDiscussion>("Discussion", discussionSchema);
export default Discussion;
