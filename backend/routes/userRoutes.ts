import express from "express";

import {
  authUser,
  getAllUsers,
  registerUser,
} from "../controllers/userController";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

router.route("/").post(registerUser).get(protect, getAllUsers);
router.post("/login", authUser);

export default router;
