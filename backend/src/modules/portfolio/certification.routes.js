import express from "express";
import { protect } from "../../middleware/auth.middleware.js";
import  validate  from "../../middleware/validation.middleware.js";

import {
  createCertificationSchema,
  updateCertificationSchema,
} from "./certification.validation.js";

import {
  createCertification,
  getCertifications,
  updateCertification,
  deleteCertification,
} from "./certification.controller.js";

const router = express.Router();

router.use(protect);

router.post(
  "/:portfolioId/certifications",
  validate(createCertificationSchema),
  createCertification
);

router.get(
  "/:portfolioId/certifications",
  getCertifications
);

router.patch(
  "/:portfolioId/certifications/:certificationId",
  validate(updateCertificationSchema),
  updateCertification
);

router.delete(
  "/:portfolioId/certifications/:certificationId",
  deleteCertification
);

export default router;