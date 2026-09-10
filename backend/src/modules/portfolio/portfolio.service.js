import Portfolio from "./portfolio.model.js";
import ApiError from "../../utils/ApiError.js";

const createPortfolio = async (userId, portfolioData) => {
  const { title, slug, description, technologies, liveUrl, githubUrl, featuredImage } =
    portfolioData;

  const existingPortfolio = await Portfolio.findOne({ slug });

  if (existingPortfolio) {
    throw new ApiError(409, "Portfolio with this slug already exists");
  }

  const portfolio = await Portfolio.create({
    userId,
    title,
    slug,
    description,
    technologies,
    liveUrl,
    githubUrl,
    featuredImage,
  });

  return portfolio;
};

const getUserPortfolios = async (userId) => {
  const portfolios = await Portfolio.find({ userId })
    .sort({ createdAt: -1 });

  return portfolios;
};

const getSinglePortfolio = async (portfolioId, userId) => {
  const portfolio = await Portfolio.findOne({
    _id: portfolioId,
    userId,
  });

  if (!portfolio) {
    throw new ApiError(404, "Portfolio not found");
  }

  return portfolio;
};

const deletePortfolio = async (portfolioId, userId) => {
  const portfolio = await Portfolio.findOneAndDelete({
    _id: portfolioId,
    userId,
  });

  if (!portfolio) {
    throw new ApiError(404, "Portfolio not found");
  }

  return portfolio;
};

const updatePortfolioSettings = async (
  portfolioId,
  userId,
  settings
) => {
  const portfolio = await Portfolio.findOne({
    _id: portfolioId,
    userId,
  });

  if (!portfolio) {
    throw new ApiError(404, "Portfolio not found");
  }

  if (settings.slug && settings.slug !== portfolio.slug) {
    const existingPortfolio = await Portfolio.findOne({
      slug: settings.slug,
      _id: { $ne: portfolioId },
    });

    if (existingPortfolio) {
      throw new ApiError(
        409,
        "Portfolio with this slug already exists"
      );
    }
  }

  Object.assign(portfolio, settings);

  await portfolio.save();

  return portfolio;
};

export default {
  createPortfolio,
  getUserPortfolios,
  getSinglePortfolio,
  deletePortfolio,
  updatePortfolioSettings,
};