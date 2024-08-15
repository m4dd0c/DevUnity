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
interface IPopulatedUsersProject {
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
  rooms: IPopulatedUsersProject[];
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
interface IPopulatedRoomsAdmin {
  _id: string;
  username: string;
  avatar: { secure_url?: string | null };
}
interface IRoom {
  _id: string;
  roomId: string;
  password?: string;
  admin: IPopulatedRoomsAdmin;
  participents: string[];
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
