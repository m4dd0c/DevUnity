import { z } from "zod";
import { roomIdRegex } from "../utils";

export const JoinRoomSchema = z.object({
  // must be a valid UUID
  roomId: z.string().regex(roomIdRegex, "Room ID must be a valid UUID."),
  password: z.string().max(100),
});

export const CreateRoomSchema = z.object({
  // must be a valid UUID
  roomId: z
    .string()
    .regex(
      roomIdRegex,
      "Room ID must be a valid UUID. You can generate one using helper button below.",
    ),
  title: z.string().min(3).max(50),
  password: z.string().min(6).max(100),
});

export const UpdateRoomSchema = z.object({
  title: z.string().min(3).max(50),
  explanation: z.string().max(150),
  description: z.string().max(5000),
});

export const UpdatePassAndLangSchema = z.object({
  password: z.string().max(100),
});

export const UpdateRoomCodeSchema = z.object({
  // objectId
  room_id: z.string().regex(roomIdRegex, "Room ID must be a valid UUID."),
  code: z.string().max(150000),
});

export const DeleteRoomSchema = z.object({
  // objectId
  room_id: z.string().regex(roomIdRegex, "Room ID must be a valid UUID."),
});
