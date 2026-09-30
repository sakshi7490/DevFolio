import { Router } from "express";

import authRoutes from "../modules/auth/auth.routes.js";
import userRoutes from "../modules/user/user.routes.js";
import portfolioRoutes from "../modules/portfolio/portfolio.routes.js";
import personalRoutes from "../modules/portfolio/personal.routes.js";
import aboutRoutes from "../modules/portfolio/about.routes.js";
import socialRoutes from "../modules/portfolio/social.routes.js";
import skillRoutes from "../modules/portfolio/skill.routes.js";
import educationRoutes from "../modules/portfolio/education.routes.js";
import certificationRoutes from "../modules/portfolio/certification.routes.js";
import projectRoutes from "../modules/portfolio/project.routes.js";
import experienceRoutes from "../modules/portfolio/experience.routes.js";
import aiRoutes from "../modules/ai/ai.routes.js";
import reviewRoutes from "../modules/ai/review.routes.js";

const router = Router();

// Health Check
router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running...",
    environment: process.env.NODE_ENV,
    timestamp: new Date(),
  });
});

// Authentication Routes
router.use("/auth", authRoutes);

// User Routes
router.use("/users", userRoutes);

// Portfolio Routes
router.use("/portfolios", portfolioRoutes);
router.use("/portfolios", personalRoutes);
router.use("/portfolios", aboutRoutes);
router.use("/portfolios", socialRoutes);
router.use("/portfolios", skillRoutes);
router.use("/portfolios",educationRoutes);
router.use("/portfolios", certificationRoutes);
router.use("/portfolios", projectRoutes);
router.use("/portfolios", experienceRoutes);

//ai route
router.use("/ai", aiRoutes);
router.use("/ai/review", reviewRoutes);

export default router;
