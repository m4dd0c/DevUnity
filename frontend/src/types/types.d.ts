interface IData<T> {
  data: T;
  message: string;
  success: boolean;
}
interface ISearchUser {
  isNext: boolean;
  users: IUser[];
}
interface IUser {
  _id: string;
  rooms: string[];
  email: string;
  username: string;
  name?: string;
  location?: string;
  portfolio?: string;
  bio?: string;
  verification: { verified: boolean };
  avatar: {
    secure_url?: string | null;
  };
  createdAt: NativeDate;
}
interface ISearchRoom {
  isNext: boolean;
  rooms: IRoom[];
}
interface IRoom {
  _id: string;
  roomId: string;
  password?: string;
  admin: string;
  participents: string[];
  discussion: string;
  project: {
    title: string;
    slogan?: string;
    description?: string;
    lang: "js" | "ts" | "py" | "cpp" | "c";
    code?: string;
  };
  createdAt: NativeDate;
  updatedAt: NativeDate;
}
