import express from "express";
import { protect, authorize } from "../../middleware/auth.middleware.js";
import { getAdminStatsController } from "./admin.controller.js";

const router = express.Router();

router.get(
  "/stats",
  protect,
  authorize("admin"),
  getAdminStatsController
);

export default router;