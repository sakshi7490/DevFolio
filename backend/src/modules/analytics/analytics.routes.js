import express from "express";
import { protect } from "../../middleware/auth.middleware.js";
import { getAnalyticsSummary } from "./analytics.controller.js";

const router = express.Router();

router.get(
  "/:portfolioId",
  protect,
  getAnalyticsSummary
);

export default router;