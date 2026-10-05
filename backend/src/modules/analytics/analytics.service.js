import Analytics from "./analytics.model.js";
import Portfolio from "../portfolio/portfolio.model.js";
import ApiError from "../../utils/ApiError.js";
import mongoose from "mongoose";

const getAnalyticsSummary = async (portfolioId, userId, startDate, endDate) => {
  const portfolio = await Portfolio.findOne({
    _id: portfolioId,
    userId,
  });

  if (!portfolio) {
    throw new ApiError(404, "Portfolio not found");
  }

  const dateFilter = {};

  if (startDate || endDate) {
    dateFilter.createdAt = {};

    if (startDate) {
      dateFilter.createdAt.$gte = new Date(startDate);
    }

    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      dateFilter.createdAt.$lte = end;
    }
  }

  const analyticsFilter = {
    portfolioId,
    ...dateFilter,
  };

  const [totalViews, uniqueVisitors, resumeDownloads, dailyStats] =
    await Promise.all([
      Analytics.countDocuments({
        ...analyticsFilter,
        eventType: "portfolio_view",
      }),

      Analytics.distinct("visitorId", {
        ...analyticsFilter,
        eventType: "portfolio_view",
      }),

      Analytics.countDocuments({
        ...analyticsFilter,
        eventType: "resume_download",
      }),

      Analytics.aggregate([
        {
          $match: {
            ...analyticsFilter,
            portfolioId: new mongoose.Types.ObjectId(portfolioId),
            eventType: {
              $in: ["portfolio_view", "resume_download"],
            },
          },
        },
        {
          $group: {
            _id: {
              date: {
                $dateToString: {
                  format: "%Y-%m-%d",
                  date: "$createdAt",
                },
              },
              eventType: "$eventType",
            },
            count: { $sum: 1 },
          },
        },
        {
          $group: {
            _id: "$_id.date",
            events: {
              $push: {
                type: "$_id.eventType",
                count: "$count",
              },
            },
          },
        },
        {
          $sort: { _id: 1 },
        },
      ]),
    ]);

  const dailyAnalytics = dailyStats.map((item) => {
    const views =
      item.events.find((event) => event.type === "portfolio_view")?.count || 0;

    const downloads =
      item.events.find((event) => event.type === "resume_download")?.count || 0;

    return {
      date: item._id,
      views,
      downloads,
    };
  });

  return {
    totalViews,
    uniqueVisitors: uniqueVisitors.length,
    resumeDownloads,
    dailyAnalytics,
  };
};

export default {
  getAnalyticsSummary,
};
