import { z } from "zod";
import { axiosInstance } from "..";
import {
  CreateRoomSchema,
  DeleteRoomSchema,
  JoinRoomSchema,
  UpdateRoomSchema,
} from "../schemas/room.schema";

export const searchRoomsAction = async ({
  query = "",
  page = 1,
  size = 10,
  ownerId = "",
}: {
  query?: string;
  page?: number;
  size?: number;
  ownerId?: string | null;
}) => {
  try {
    const { data }: { data: IData<ISearchRoom> } = await axiosInstance.get(
      `/room/search/${query}?page=${page}&size=${size}&ownerId=${ownerId}`,
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createRoomAction = async (
  formData: z.infer<typeof CreateRoomSchema>,
) => {
  try {
    const { data }: { data: IData<string> } = await axiosInstance.post(
      `/room/${formData.roomId}`,
      formData,
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const joinRoomAction = async (
  formData: z.infer<typeof JoinRoomSchema>,
) => {
  try {
    const { data }: { data: IData<string> } = await axiosInstance.get(
      `/room/${formData.roomId}?password=${formData.password}`,
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateRoomAction = async ({
  formData,
  roomId,
}: {
  formData: z.infer<typeof UpdateRoomSchema>;
  roomId: string;
}) => {
  try {
    const { data }: { data: IData<ISearchRoom> } = await axiosInstance.put(
      `/room/${roomId}`,
      formData,
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

// save code action
export const saveCodeAction = async ({
  roomId,
  code,
}: {
  code: string;
  roomId: string;
}) => {
  try {
    console.log({ roomId, code });
    const { data }: { data: IData<undefined> } = await axiosInstance.put(
      `/room/save/code/${roomId}`,
      { code },
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

// update password or language or both
export const updatePasswordAndLangAction = async ({
  formData,
  roomId,
}: {
  formData: { password: string; lang: TLang };
  roomId: string;
}) => {
  if (!formData.lang) formData.lang = "" as any;
  if (!formData.password) formData.password = "";
  try {
    const { data }: { data: IData<ISearchRoom> } = await axiosInstance.put(
      `/room/settings/${roomId}`,
      formData,
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const deleteRoomAction = async (
  formData: z.infer<typeof DeleteRoomSchema>,
) => {
  try {
    const { data }: { data: IData<ISearchRoom> } = await axiosInstance.delete(
      `/room/${formData.room_id}`,
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getRoomAction = async ({
  roomId,
  query,
}: {
  roomId: string | undefined;
  query: "r" | "rwx";
}) => {
  if (!roomId) return;
  try {
    const { data }: { data: IData<IRoom> } = await axiosInstance.get(
      `/room/single/${roomId}?query=${query}`,
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
// export const searchRoomsAction = async ({
//   query,
//   page = 1,
//   size = 10,
// }: {
//   query: string;
//   page: number;
//   size: number;
// }) => {
//   try {
//     const { data }: { data: IData<ISearchRoom> } = await axiosInstance.get(
//       `/room/search/${query}?page=${page}&size=${size}`,
//     );
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };
// export const searchRoomsAction = async ({
//   query,
//   page = 1,
//   size = 10,
// }: {
//   query: string;
//   page: number;
//   size: number;
// }) => {
//   try {
//     const { data }: { data: IData<ISearchRoom> } = await axiosInstance.get(
//       `/room/search/${query}?page=${page}&size=${size}`,
//     );
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };
