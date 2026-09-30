import express from "express";

import { protect } from "../../middleware/auth.middleware.js";
import { reviewPortfolio } from "./review.controller.js";

const router = express.Router();

router.post("/", protect, reviewPortfolio);

export default router;