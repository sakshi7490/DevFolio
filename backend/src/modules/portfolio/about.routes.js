import express from "express";
import { updateAbout ,getAbout } from "./about.controller.js";
import { protect } from "../../middleware/auth.middleware.js";
import validate from "../../middleware/validation.middleware.js";
import updateAboutSchema from "./about.validation.js";

const router = express.Router();

router.put(
  "/:portfolioId/about",
  protect,
  validate(updateAboutSchema),
  updateAbout
);

router.get(
  "/:portfolioId/about",
  protect,
  getAbout
);

export default router;