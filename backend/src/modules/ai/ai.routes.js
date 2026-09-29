import express from "express";

import { protect } from "../../middleware/auth.middleware.js";
import { generateAbout, improveProjectDescription,suggestSkills,
    improveGrammar,
 } from "./ai.controller.js";

const router = express.Router();

router.post("/about", protect, generateAbout);
router.post(
  "/project-description",
  protect,
  improveProjectDescription,
);

router.post(
  "/suggest-skills",
  protect,
  suggestSkills,
);

router.post(
  "/improve-grammar",
  protect,
  improveGrammar,
);

export default router;