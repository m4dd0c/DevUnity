import express from "express";
import {
  getRoom,
  createRoom,
  editDescription,
  deleteRoom,
  createDescription,
} from "../controller/roomController";
const router = express.Router();

router.route("/:roomId").get(getRoom).post(createRoom).delete(deleteRoom);
router
  .route("/:roomId/description")
  .post(createDescription)
  .put(editDescription);
