import express from "express";

import {
  create,
  getAll,
  getOne,
  update,
  remove,
} from "./experience.controller.js";

import { protect } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.post("/:portfolioId/experiences", create);

router.get("/:portfolioId/experiences", getAll);

router.get(
  "/:portfolioId/experiences/:experienceId",
  getOne
);

router.patch(
  "/:portfolioId/experiences/:experienceId",
  update
);

router.delete(
  "/:portfolioId/experiences/:experienceId",
  remove
);

export default router;