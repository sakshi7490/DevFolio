import express from "express";

import {
  create,
  getAll,
  getOne,
  update,
  remove,
} from "./project.controller.js";

import { protect } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.post("/:portfolioId/projects", create);

router.get("/:portfolioId/projects", getAll);

router.get("/:portfolioId/projects/:projectId", getOne);

router.patch(
  "/:portfolioId/projects/:projectId",
  update
);

router.delete(
  "/:portfolioId/projects/:projectId",
  remove
);

export default router;