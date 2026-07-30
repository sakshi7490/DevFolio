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