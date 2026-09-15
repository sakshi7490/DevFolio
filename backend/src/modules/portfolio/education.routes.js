import express from "express";
import { protect } from "../../middleware/auth.middleware.js";
import  validate  from "../../middleware/validation.middleware.js";

import {
  createEducationSchema,
  updateEducationSchema,
} from "./education.validation.js";

import {
  createEducation,
  getEducation,
  updateEducation,
  deleteEducation,
} from "./education.controller.js";

const router = express.Router();

router.use(protect);

router.post(
  "/:portfolioId/education",
  validate(createEducationSchema),
  createEducation
);

router.get(
  "/:portfolioId/education",
  getEducation
);

router.patch(
  "/:portfolioId/education/:educationId",
  validate(updateEducationSchema),
  updateEducation
);

router.delete(
  "/:portfolioId/education/:educationId",
  deleteEducation
);

export default router;