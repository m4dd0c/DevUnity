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
  const { data }: { data: IData<ISearchRoom> } = await axiosInstance.get(
    `/room/search/${query}?page=${page}&size=${size}&ownerId=${ownerId}`,
  );
  return data;
};

export const createRoomAction = async (
  formData: z.infer<typeof CreateRoomSchema>,
) => {
  const { data }: { data: IData<string> } = await axiosInstance.post(
    `/room/${formData.roomId}`,
    formData,
  );
  return data;
};

export const joinRoomAction = async (
  formData: z.infer<typeof JoinRoomSchema>,
) => {
  const { data }: { data: IData<string> } = await axiosInstance.get(
    `/room/${formData.roomId}?password=${formData.password}`,
  );
  return data;
};

export const updateRoomAction = async ({
  formData,
  roomId,
}: {
  formData: z.infer<typeof UpdateRoomSchema>;
  roomId: string;
}) => {
  const { data }: { data: IData<ISearchRoom> } = await axiosInstance.put(
    `/room/${roomId}`,
    formData,
  );
  return data;
};

// save code action
export const saveCodeAction = async ({
  roomId,
  code,
}: {
  code: string;
  roomId: string;
}) => {
  const { data }: { data: IData<undefined> } = await axiosInstance.put(
    `/room/save/code/${roomId}`,
    { code },
  );
  return data;
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
  const { data }: { data: IData<boolean> } = await axiosInstance.put(
    `/room/settings/${roomId}`,
    formData,
  );
  return data;
};

export const deleteRoomAction = async (
  formData: z.infer<typeof DeleteRoomSchema>,
) => {
  const { data }: { data: IData<ISearchRoom> } = await axiosInstance.delete(
    `/room/${formData.room_id}`,
  );
  return data;
};

export const getRoomAction = async ({
  roomId,
  query,
}: {
  roomId: string | undefined;
  query: "r" | "rwx";
}) => {
  if (!roomId) return;
  const { data }: { data: IData<IRoom> } = await axiosInstance.get(
    `/room/single/${roomId}?query=${query}`,
  );
  return data;
};
