import About from "./about.model.js";
import Portfolio from "./portfolio.model.js";
import ApiError from "../../utils/ApiError.js";
import { sanitizeText } from "../../utils/helpers.js";



const updateAbout = async (
  portfolioId,
  userId,
  aboutData
) => {
  const portfolio = await Portfolio.findOne({
    _id: portfolioId,
    userId,
  });

  if (!portfolio) {
    throw new ApiError(404, "Portfolio not found");
  }

  const sanitizedData = {
  content: sanitizeText(aboutData.content),
};

  const about = await About.findOneAndUpdate(
    { portfolioId },
    sanitizedData,
    {
      new: true,
      upsert: true,
      runValidators: true,
      setDefaultsOnInsert: true,
    }
  );

  return about;
};

const getAbout = async (portfolioId, userId) => {
  const portfolio = await Portfolio.findOne({
    _id: portfolioId,
    userId,
  });

  if (!portfolio) {
    throw new ApiError(404, "Portfolio not found");
  }

  const about = await About.findOne({
    portfolioId,
  });

  if (!about) {
    throw new ApiError(404, "About section not found");
  }

  return about;
};

export default {
  updateAbout,
  getAbout,
};