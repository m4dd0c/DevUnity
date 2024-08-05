import express from "express";
import {
  getDiscussion,
  updateDiscussion,
  deleteDiscussion,
} from "../controller/discussionController";

const router = express.Router();

router
  .route("/:roomid/discussion")
  .get(getDiscussion)
  .put(updateDiscussion)
  .delete(deleteDiscussion);

export default router;
