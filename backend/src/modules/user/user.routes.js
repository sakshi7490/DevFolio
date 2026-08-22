import express from "express";

import {
  getProfile,
  updateProfile,
} from "./user.controller.js";

import { updateProfileSchema } from "./user.validation.js";

import { protect } from "../../middleware/auth.middleware.js";
import validate from "../../middleware/validation.middleware.js";

const router = express.Router();

router.get("/profile", protect, getProfile);

router.put(
  "/profile",
  protect,
  validate(updateProfileSchema),
  updateProfile
);

export default router;