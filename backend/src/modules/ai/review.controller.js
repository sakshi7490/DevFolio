import asyncHandler from "../../utils/asyncHandler.js";
import portfolioService from "../portfolio/portfolio.service.js";
import aiService from "../../services/ai.service.js";
import aiPrompts from "./ai.prompts.js";

export const reviewPortfolio = asyncHandler(async (req, res) => {
  const { portfolioId } = req.body;

  if (!portfolioId) {
    return res.status(400).json({
      success: false,
      message: "Portfolio ID is required",
    });
  }

  const portfolioData =
    await portfolioService.getPortfolioForReview(
      portfolioId,
      req.user._id,
    );

  const {
    personal,
    about,
    social,
    skills,
    education,
    certifications,
    projects,
    experience,
  } = portfolioData;

  const sections = {
    personal,
    about,
    social,
    skills,
    education,
    certifications,
    projects,
    experience,
  };

  const missingSections = [];

  Object.entries(sections).forEach(([section, data]) => {
    if (
      !data ||
      (Array.isArray(data) && data.length === 0)
    ) {
      missingSections.push(section);
    }
  });

  const totalSections = Object.keys(sections).length;

  const completedSections =
    totalSections - missingSections.length;

  const completionScore = Math.round(
    (completedSections / totalSections) * 100,
  );

  const prompt =
    aiPrompts.portfolioReviewPrompt(portfolioData);

  const suggestions = await aiService.generateContent(
    prompt,
    "No additional improvement suggestions are available at this time.",
  );

  res.status(200).json({
    success: true,
    message: "Portfolio review completed successfully",
    data: {
      completionScore,
      completedSections,
      totalSections,
      missingSections,
      suggestions,
    },
  });
});