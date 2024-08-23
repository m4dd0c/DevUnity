type TFilters = "all" | "owned" | "contributions";
type TLang = "js" | "c" | "cpp" | "ts" | "py";
interface IData<T> {
  data: T;
  message: string;
  success: boolean;
}
interface ISearchUser {
  isNext: boolean;
  users: IUser[];
}
interface IPopulatedRoom {
  _id: string;
  admin: string;
  roomId: string;
  project: {
    title: string;
    lang: string;
    explanation: string;
  };
  createdAt: string;
  updatedAt: string;
}
interface IUser {
  _id: string;
  rooms: IPopulatedRoom[];
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
  createdAt: string;
}
interface ISearchRoom {
  isNext: boolean;
  rooms: IRoom[];
}
interface IPopulatedUser {
  _id: string;
  username: string;
  avatar: { secure_url?: string | null };
}
interface IRoom {
  _id: string;
  roomId: string;
  password?: string;
  admin: IPopulatedUser;
  participents: IPopulatedUser[];
  activeUsers: string[]; // activeUsers' ids
  discussion: string;
  project: {
    title: string;
    explanation?: string;
    description?: string;
    lang: "js" | "ts" | "py" | "cpp" | "c";
    code?: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface ITabButtons {
  describeBtn: null | HTMLButtonElement;
  descriptionBtn: null | HTMLButtonElement;
}

interface IMessage {
  message: string;
  sender: IPopulatedUser;
}
interface IDiscussion {
  _id: string;
  admin: string;
  room: string;
  chat: IMessage[];
  createdAt: string;
  updatedAt: string;
}
