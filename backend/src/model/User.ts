import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import isEmail from "validator/lib/isEmail";
import { IUser } from "../types/types";
import Room from "./Room";
import CollabriteError from "../utils/CollabriteError";
import Discussion from "./Discussion";

const userSchema = new Schema<IUser>(
  {
    rooms: [
      {
        type: Schema.Types.ObjectId,
        ref: "Room",
      },
    ],
    email: {
      required: true,
      type: String,
      trim: true,
      lowercase: true,
      maxlength: 100,
      minlength: 3,
      unique: true,
      validator: isEmail,
    },
    username: {
      required: true,
      type: String,
      trim: true,
      lowercase: true,
      minlength: 3,
      maxlength: 32,
      unique: true,
    },
    name: {
      type: String,
      trim: true,
      maxlength: 32,
    },
    password: {
      type: String,
      select: false,
      required: true,
      minlength: 8,
      maxlength: 100,
    },
    portfolio: {
      type: String,
      minlength: [10, "Portfolio must include at least 10 characters."],
      maxlength: [50, "Portfolio must include at most 50 characters."],
    },
    location: {
      type: String,
      minlength: [5, "Location must contain at least 5 characters."],
      maxlength: [50, "Location must contain at most 50 characters."],
    },
    bio: {
      type: String,
      maxlength: [125, "Bio must contain at most 125 characters."],
    },
    resetPassword: {
      token: {
        type: String,
        default: null,
      },
      expiresAt: {
        type: Date,
        default: null,
      },
    },
    verification: {
      verified: {
        type: Boolean,
        default: false,
      },
      expiresAt: {
        type: Date,
        default: null,
      },
      token: {
        type: String,
        default: null,
      },
    },
    avatar: {
      secure_url: {
        type: String,
        default: null,
      },
      public_id: {
        type: String,
        default: null,
      },
    },
  },
  { timestamps: true },
);

// deleting user if verification token expires
userSchema.index({ "verification.expiresAt": 1 }, { expireAfterSeconds: 0 });

// removing all rooms created by user
// Model.deleteOne({condition}) supports document middleware
// user.deleteOne() doesnt support document middleware
userSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      // deleting users all rooms
      const rooms = await Room.deleteMany({ admin: this._id });
      if (!rooms)
        return next(
          new CollabriteError(
            500,
            "rooms, that are created by deleted user couldn't be deleted.",
          ),
        );

      const discussions = await Discussion.deleteMany({ admin: this._id });
      if (!discussions)
        return next(
          new CollabriteError(
            500,
            "rooms, that are created by deleted user couldn't be deleted.",
          ),
        );
      next();
    } catch (error) {
      console.log(error);
    }
  },
);

// hashing users password before save
userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) next();
  const hashedPass = await bcrypt.hash(this.password, 12);
  this.password = hashedPass;
});

// method to compare entered password and real password
userSchema.method("comparePassword", async function (password) {
  const isIdeal = await bcrypt.compare(password, this.password);
  return isIdeal;
});

// generate jwttoken with expiry of 7days
userSchema.method("genJwt", function () {
  const jwtSecrect = process.env.JWT_SECRET;
  if (!jwtSecrect) return false;
  const token = jwt.sign({ _id: this._id }, jwtSecrect, {
    expiresIn: "7d",
  });
  return token;
});

const User = model<IUser>("User", userSchema);
export default User;
