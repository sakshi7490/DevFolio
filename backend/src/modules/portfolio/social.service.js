import Social from "./social.model.js";
import Portfolio from "./portfolio.model.js";
import ApiError from "../../utils/ApiError.js";
import { sanitizeUrl } from "../../utils/helpers.js";

const updateSocial = async (
  portfolioId,
  userId,
  socialData
) => {
  const portfolio = await Portfolio.findOne({
    _id: portfolioId,
    userId,
  });

  if (!portfolio) {
    throw new ApiError(404, "Portfolio not found");
  }

  const sanitizedData = {
  github: sanitizeUrl(socialData.github),
  linkedin: sanitizeUrl(socialData.linkedin),
  twitter: sanitizeUrl(socialData.twitter),
  instagram: sanitizeUrl(socialData.instagram),
  website: sanitizeUrl(socialData.website),
};

  const social = await Social.findOneAndUpdate(
    { portfolioId },
    sanitizedData,
    {
      new: true,
      upsert: true,
      runValidators: true,
      setDefaultsOnInsert: true,
    }
  );

  return social;
};

const getSocial = async (portfolioId, userId) => {
  const portfolio = await Portfolio.findOne({
    _id: portfolioId,
    userId,
  });

  if (!portfolio) {
    throw new ApiError(404, "Portfolio not found");
  }

  const social = await Social.findOne({
    portfolioId,
  });

  if (!social) {
    throw new ApiError(404, "Social links not found");
  }

  return social;
};

export default {
  updateSocial,
  getSocial,
};