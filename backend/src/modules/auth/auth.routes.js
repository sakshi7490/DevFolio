import { Router } from "express";

import {
  register,
  login,
  getMe,
  logout,
} from "./auth.controller.js";

import {
  registerSchema,
  loginSchema,
} from "./auth.validation.js";

import validate from "../../middleware/validation.middleware.js";
import { protect } from "../../middleware/auth.middleware.js";

const router = Router();

// Public Routes
router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

// Protected Routes
router.get("/me", protect, getMe);
router.post("/logout", protect, logout);

export default router;