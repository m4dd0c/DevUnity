import { Document, Types } from "mongoose";

declare module "jsonwebtoken" {
  export interface JwtPayload {
    _id: string;
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
      file?: any;
    }
  }
}
interface IVerification {
  verified: boolean;
  expiresAt: NativeDate;
  token: string;
}
interface IVerificationOmitted {
  verification: {
    verified: boolean;
  };
}
interface IPopulatedUsersProject {
  _id: Types.ObjectId;
  roomId: string;
  project: {
    title: string;
    explanation: string;
    lang: "js" | "ts" | "py" | "cpp" | "c";
  };
  createdAt: NativeDate;
  updatedAt: NativeDate;
}

interface IUser extends Document {
  _id: Types.ObjectId;
  rooms: Types.ObjectId[] | IPopulatedUsersProject[];
  email: string;
  username: string;
  name?: string;
  password: string;
  location: string;
  portfolio: string;
  bio: string;
  resetPassword: {
    token: string | null;
    expiresAt: NativeDate | null;
  };
  verification: IVerification;
  avatar: {
    secure_url: string | null;
    public_id: string | null;
  };
  updatedAt: NativeDate;
  createdAt: NativeDate;
  comparePassword: (token: string) => Promise<boolean>;
  genJwt: () => string | false;
}
interface IRoom extends Document {
  _id: Types.ObjectId;
  roomId: string;
  password: string;
  admin: Types.ObjectId;
  participents: Types.ObjectId[];
  activeUsers: Types.ObjectId[];
  discussion: Types.ObjectId;
  project: {
    title: string;
    explanation?: string;
    description?: string;
    lang: "js" | "java" | "py" | "cpp" | "c" | "php";
    code?: string;
  };
  createdAt: NativeDate;
  updatedAt: NativeDate;
}

interface IMessage {
  message: string;
  sender: Types.ObjectId;
}
interface IDiscussion extends Document {
  _id: Types.ObjectId;
  admin: Types.ObjectId;
  room: Types.ObjectId;
  chat: IMessage[];
  createdAt: NativeDate;
  updatedAt: NativeDate;
}
type TTarget = "all" | "rooms" | "users" | "discussions";
type TDestroy = boolean | undefined;
type TForce = boolean | undefined;

interface ISeed {
  target: TTarget;
  destroy: TDestroy;
  force: TForce;
}
type ISeedFuncCall = Omit<ISeed, "target">;
