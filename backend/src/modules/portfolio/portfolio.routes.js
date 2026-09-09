import express from "express";
import validate from "../../middleware/validation.middleware.js";
import { createPortfolioSchema } from "./portfolio.validation.js";

import {
  createPortfolio,
  getUserPortfolios,
  getSinglePortfolio,
  deletePortfolio,
} from "./portfolio.controller.js";

import { protect } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, validate(createPortfolioSchema), createPortfolio);


router.get("/", protect, getUserPortfolios);

router.get("/:id", protect, getSinglePortfolio);

router.delete("/:id", protect, deletePortfolio);
export default router;