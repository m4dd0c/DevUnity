import express from "express";
import {
  getDiscussion,
  updateDiscussion,
} from "../controller/discussionController";

const router = express.Router();

router.route("/:roomid/discussion").get(getDiscussion).put(updateDiscussion);

export default router;
