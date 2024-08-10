interface IData<T> {
  data: T;
  message: string;
  success: boolean;
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
