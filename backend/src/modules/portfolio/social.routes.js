import express from "express";
import { updateSocial,getSocial } from "./social.controller.js";
import { protect } from "../../middleware/auth.middleware.js";
import validate from "../../middleware/validation.middleware.js";
import updateSocialSchema from "./social.validation.js";

const router = express.Router();

router.put(
  "/:portfolioId/social",
  protect,
  validate(updateSocialSchema),
  updateSocial
);

router.get(
  "/:portfolioId/social",
  protect,
  getSocial
);

export default router;