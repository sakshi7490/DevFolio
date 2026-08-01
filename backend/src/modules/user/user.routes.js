import express from "express";
import {registerUserController,loginUserController,} from "./user.controller.js";
import { validate } from "../../middleware/validation.middleware.js";
import {registerSchema,loginSchema,} from "./user.validation.js";

const router = express.Router();

router.post(
  "/register",
  validate(registerSchema),
  registerUserController
);

router.post(
  "/login",
  validate(loginSchema),
  loginUserController
);

export default router;