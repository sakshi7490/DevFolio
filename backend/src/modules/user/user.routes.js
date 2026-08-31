import express from "express";

import {
  getUserProfile,
  updateUserProfile,
} from "./user.controller.js";

import { updateProfileSchema } from "./user.validation.js";

import { protect } from "../../middleware/auth.middleware.js";
import validate from "../../middleware/validation.middleware.js";

const router = express.Router();

router.get("/profile", protect, getUserProfile);

router.put(
  "/profile",
  protect,
  validate(updateProfileSchema),
  updateUserProfile
);

export default router;
