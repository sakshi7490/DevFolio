import express from "express";
import { protect } from "../../middleware/auth.middleware.js";
import upload from "../../middleware/upload.middleware.js";
import { uploadResume, importResumeData  } from "./resume.controller.js";

const router = express.Router();

router.post(
  "/upload",
  protect,
  upload.single("resume"),
  uploadResume,
);

router.post(
  "/import",
  protect,
  importResumeData,
);

export default router;