import express from "express";

import {
  accessChat,
  fetchChats,
  createGroupChat,
} from "../controllers/chatController";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChats);
router.route("/create-group").post(protect, createGroupChat);
// router.route("/rename-group").put(protect, renameGroupChat);
// router.route("/leave-group").put(protect, leaveGroupChat);
// router.route("/add-to-group").put(protect, addToGroupChat);

export default router;
