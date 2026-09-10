import asyncHandler from "../../utils/asyncHandler.js";
import portfolioService from "./portfolio.service.js";

export const createPortfolio = asyncHandler(async (req, res) => {
  const portfolio = await portfolioService.createPortfolio(
    req.user._id,
    req.body
  );

  res.status(201).json({
    success: true,
    message: "Portfolio created successfully",
    data: portfolio,
  });
});

export const getUserPortfolios = asyncHandler(async (req, res) => {
  const portfolios = await portfolioService.getUserPortfolios(
    req.user._id
  );

  res.status(200).json({
    success: true,
    message: "Portfolios fetched successfully",
    data: portfolios,
  });
});

export const getSinglePortfolio = asyncHandler(async (req, res) => {
  const portfolio = await portfolioService.getSinglePortfolio(
    req.params.id,
    req.user._id
  );

  res.status(200).json({
    success: true,
    message: "Portfolio fetched successfully",
    data: portfolio,
  });
});


export const deletePortfolio = asyncHandler(async (req, res) => {
  await portfolioService.deletePortfolio(
    req.params.id,
    req.user._id
  );

  res.status(200).json({
    success: true,
    message: "Portfolio deleted successfully",
  });
});

export const updatePortfolioSettings = asyncHandler(
  async (req, res) => {
    const portfolio =
      await portfolioService.updatePortfolioSettings(
        req.params.id,
        req.user._id,
        req.body
      );

    res.status(200).json({
      success: true,
      message: "Portfolio settings updated successfully",
      data: portfolio,
    });
  }
);