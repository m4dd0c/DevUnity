import express from "express";
import {
  getDiscussion,
  updateDiscussion,
} from "../controller/discussionController";
import { authenticated } from "../middleware/authenticated";

const router = express.Router();

router
  .route("/:roomId")
  .get(authenticated, getDiscussion)
  .put(authenticated, updateDiscussion);

export default router;
