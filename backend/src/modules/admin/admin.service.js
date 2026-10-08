import { getUserStats } from "../user/user.service.js";
import portfolioService from "../portfolio/portfolio.service.js";

export const getAdminStats = async () => {
  const userStats = await getUserStats();
  const portfolioStats = await portfolioService.getPortfolioStats();

  return {
    ...userStats,
    ...portfolioStats,
  };
};