import asyncHandler from "../../utils/asyncHandler.js";
import analyticsService from "./analytics.service.js";

export const getAnalyticsSummary = asyncHandler(async (req, res) => {
  const analytics = await analyticsService.getAnalyticsSummary(
    req.params.portfolioId,
    req.user._id,
    req.query.startDate,
    req.query.endDate,
  );

  res.status(200).json({
    success: true,
    message: "Analytics fetched successfully",
    data: analytics,
  });
});
