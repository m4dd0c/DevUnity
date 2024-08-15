import { z } from "zod";

export const JoinRoomSchema = z.object({
  // custom-id
  roomId: z.string().min(8).max(100),
  password: z.string().max(100),
});

export const CreateRoomSchema = z.object({
  // custom-id
  roomId: z.string().min(8).max(100),
  title: z.string().min(3).max(50),
  password: z.string().min(6).max(100),
});

export const UpdateRoomSchema = z.object({
  title: z.string().min(3).max(50),
  explanation: z.string().max(150),
  description: z.string().max(5000),
});

export const UpdatePassAndLangSchema = z.object({
  lang: z.string().min(1).max(15),
  password: z.string().min(6).max(100),
});

export const UpdateRoomCodeSchema = z.object({
  // objectId
  room_id: z.string().max(8).max(100),
  code: z.string().max(150000),
});

export const DeleteRoomSchema = z.object({
  // objectId
  room_id: z.string().min(8).max(100),
});
