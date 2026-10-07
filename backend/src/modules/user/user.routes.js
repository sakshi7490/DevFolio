import express from "express";

import {
  getUserProfile,
  updateUserProfile,
  getUsers,
  updateUserBlockStatus,
} from "./user.controller.js";

import { updateProfileSchema } from "./user.validation.js";

import { protect , authorize} from "../../middleware/auth.middleware.js";
import validate from "../../middleware/validation.middleware.js";

const router = express.Router();

router.get("/profile", protect, getUserProfile);

router.put(
  "/profile",
  protect,
  validate(updateProfileSchema),
  updateUserProfile
);

router.get(
  "/users",
  protect,
  authorize("admin"),
  getUsers
);

router.patch(
  "/users/:userId/block",
  protect,
  authorize("admin"),
  updateUserBlockStatus
);

export default router;
