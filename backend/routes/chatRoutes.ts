import express from "express";

import {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroupChat,
  addToGroupChat,
  leaveGroupChat,
} from "../controllers/chatController";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChats);
router.route("/create-group").post(protect, createGroupChat);
router.route("/rename-group").put(protect, renameGroupChat);
router.route("/add-to-group").put(protect, addToGroupChat);
router.route("/leave-group").put(protect, leaveGroupChat);

export default router;
