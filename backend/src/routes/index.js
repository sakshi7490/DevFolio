<<<<<<< HEAD
const express = require("express");

const authRoutes = require("../modules/auth/auth.routes");
const userRoutes = require("../modules/user/user.routes");
const portfolioRoutes = require("../modules/portfolio/portfolio.routes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/portfolios", portfolioRoutes);

module.exports = router;
=======
import { Router } from "express";

import authRoutes from "../modules/auth/auth.routes.js";
import userRoutes from "../modules/user/user.routes.js";

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

export default router;
>>>>>>> 2ce68f34ee245e8af9c2d846267b7f2c54cebd7c
