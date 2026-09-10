import express from "express";
import validate from "../../middleware/validation.middleware.js";
import {
  createPortfolioSchema,
  updatePortfolioSettingsSchema,
} from "./portfolio.validation.js";
import {
  createPortfolio,
  getUserPortfolios,
  getSinglePortfolio,
  deletePortfolio,
  updatePortfolioSettings,
} from "./portfolio.controller.js";

import { protect } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, validate(createPortfolioSchema), createPortfolio);


router.get("/", protect, getUserPortfolios);

router.get("/:id", protect, getSinglePortfolio);

router.delete("/:id", protect, deletePortfolio);
router.patch(
  "/:id/settings",
  protect,
  validate(updatePortfolioSettingsSchema),
  updatePortfolioSettings
);
export default router;
