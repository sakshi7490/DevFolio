<<<<<<< HEAD
const express = require("express");

const {
  getProfile,
  updateProfile,
} = require("./user.controller");

const {
  validateProfileUpdate,
} = require("./user.validation");

const authMiddleware = require("../../middleware/auth.middleware");

const router = express.Router();

router.get("/profile", authMiddleware, getProfile);

router.patch(
  "/profile",
  authMiddleware,
  validateProfileUpdate,
  updateProfile
);

module.exports = router;
=======
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
>>>>>>> 2ce68f34ee245e8af9c2d846267b7f2c54cebd7c
