import express from "express";
import upload from "../../middleware/upload.middleware.js";
import validate from "../../middleware/validation.middleware.js";

import {
  createPortfolioSchema,
  updatePortfolioSettingsSchema,
} from "./portfolio.validation.js";
import {
  createPortfolio,
  getUserPortfolios,
  getSinglePortfolio,
  getPublicPortfolio,
  getPublicResume,
  deletePortfolio,
  updatePortfolioSettings,
  uploadPortfolioImage,
    getAdminPortfolios,
  removeAdminPortfolio,
} from "./portfolio.controller.js";

import { protect , authorize } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, validate(createPortfolioSchema), createPortfolio);


router.get("/", protect, getUserPortfolios);

router.get("/public/:slug", getPublicPortfolio);

router.get("/public/:slug/resume", getPublicResume);

router.get(
  "/admin/all",
  protect,
  authorize("admin"),
  getAdminPortfolios
);

router.delete(
  "/admin/:portfolioId",
  protect,
  authorize("admin"),
  removeAdminPortfolio
);

router.get("/:id", protect, getSinglePortfolio);


router.delete("/:id", protect, deletePortfolio);
router.patch(
  "/:id/settings",
  protect,
  validate(updatePortfolioSettingsSchema),
  updatePortfolioSettings
);

router.post(
  "/:id/image",
  protect,
  upload.single("image"),
  uploadPortfolioImage
);
export default router;
