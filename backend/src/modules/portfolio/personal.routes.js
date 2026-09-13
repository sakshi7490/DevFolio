import express from "express";
import upload from "../../middleware/upload.middleware.js";
import { updatePersonal ,getPersonal ,uploadProfileImage} from "./personal.controller.js";
import { protect } from "../../middleware/auth.middleware.js";
import validate from "../../middleware/validation.middleware.js";
import updatePersonalSchema from "./personal.validation.js";

const router = express.Router();

router.put(
  "/:portfolioId/personal",
  protect,
  validate(updatePersonalSchema),
  updatePersonal
);

router.get(
  "/:portfolioId/personal",
  protect,
  getPersonal
);

router.post(
  "/:portfolioId/personal/image",
  protect,
  upload.single("profileImage"),
  uploadProfileImage
);

export default router;