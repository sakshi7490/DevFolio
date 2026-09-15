import express from "express";
import { protect } from "../../middleware/auth.middleware.js";
import  validate  from "../../middleware/validation.middleware.js";

import {
  createSkillSchema,
  updateSkillSchema,
} from "./skill.validation.js";

import {
  createSkill,
  getSkills,
  updateSkill,
  deleteSkill,
} from "./skill.controller.js";

const router = express.Router();

router.use(protect);

router.post(
  "/:portfolioId/skills",
  validate(createSkillSchema),
  createSkill
);

router.get(
  "/:portfolioId/skills",
  getSkills
);

router.patch(
  "/:portfolioId/skills/:skillId",
  validate(updateSkillSchema),
  updateSkill
);

router.delete(
  "/:portfolioId/skills/:skillId",
  deleteSkill
);

export default router;