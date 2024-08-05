import express from "express";
import {
  getRoom,
  joinRoom,
  createRoom,
  deleteRoom,
  allRooms,
  updateRoom,
} from "../controller/roomController";
import { authenticated } from "../middleware/authenticated";

const router = express.Router();

router
  .route("/:roomId")
  .get(authenticated, joinRoom)
  .post(authenticated, createRoom)
  .put(authenticated, updateRoom)
  .delete(authenticated, deleteRoom);

router.route("/all/:ownerId").get(authenticated, allRooms);
router.route("/single/:roomId").get(authenticated, getRoom);

export default router;
