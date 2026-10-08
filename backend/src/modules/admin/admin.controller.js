import asyncHandler from "../../utils/asyncHandler.js";
import { getAdminStats } from "./admin.service.js";

export const getAdminStatsController = asyncHandler(async (req, res) => {
  const stats = await getAdminStats();

  res.status(200).json({
    success: true,
    data: stats,
  });
});