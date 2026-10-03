import express from "express";
import { protect } from "../../middleware/auth.middleware.js";
import { getGithubData ,importGithubRepositories,} from "./github.controller.js";

const router = express.Router();

router.post("/connect", protect, getGithubData);
router.post("/import", protect, importGithubRepositories);

export default router;