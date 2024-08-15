import express from "express";
import {
  getRoom,
  joinRoom,
  createRoom,
  deleteRoom,
  allRooms,
  updateRoom,
  searchRoom,
  updatePassAndLang,
} from "../controller/roomController";
import { authenticated } from "../middleware/authenticated";

const router = express.Router();

router
  .route("/:roomId")
  .get(authenticated, joinRoom)
  .post(authenticated, createRoom)
  .put(authenticated, updateRoom)
  .delete(authenticated, deleteRoom);

router.route("/search/:query").get(searchRoom);

router.route("/all/:ownerId").get(allRooms);
router.route("/single/:roomId").get(authenticated, getRoom);

router.route("/setting/:roomId").put(authenticated, updatePassAndLang);
// router.route('/kick/:roomId/:userId').get(authenticated, kickUser)

export default router;
