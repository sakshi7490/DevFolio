import Personal from "./personal.model.js";
import Portfolio from "./portfolio.model.js";
import ApiError from "../../utils/ApiError.js";
import cloudinaryService from "../../services/cloudinary.service.js";
import { sanitizeText, sanitizeUrl } from "../../utils/helpers.js";


const updatePersonal = async (
  portfolioId,
  userId,
  personalData
) => {
  const portfolio = await Portfolio.findOne({
    _id: portfolioId,
    userId,
  });

  if (!portfolio) {
    throw new ApiError(404, "Portfolio not found");
  }

  // Sanitize the input data
  const sanitizedData = {
  ...personalData,
  name: sanitizeText(personalData.name),
  headline: sanitizeText(personalData.headline),
  location: sanitizeText(personalData.location),
  profileImage: sanitizeUrl(personalData.profileImage),
};

  const personal = await Personal.findOneAndUpdate(
    { portfolioId },
    sanitizedData,
    {
      new: true,
      upsert: true,
      runValidators: true,
      setDefaultsOnInsert: true,
    }
  );

  return personal;
};

const getPersonal = async (portfolioId, userId) => {
  const portfolio = await Portfolio.findOne({
    _id: portfolioId,
    userId,
  });

  if (!portfolio) {
    throw new ApiError(404, "Portfolio not found");
  }

  const personal = await Personal.findOne({
    portfolioId,
  });

  if (!personal) {
    throw new ApiError(404, "Personal details not found");
  }

  return personal;
};


const uploadProfileImage = async (
  portfolioId,
  userId,
  file
) => {
  const portfolio = await Portfolio.findOne({
    _id: portfolioId,
    userId,
  });

  if (!portfolio) {
    throw new ApiError(404, "Portfolio not found");
  }

  if (!file) {
    throw new ApiError(400, "Profile image is required");
  }

  const result = await cloudinaryService.uploadImage(
    file.buffer,
    `devfolio/${portfolioId}`
  );

  const personal = await Personal.findOneAndUpdate(
    { portfolioId },
    {
      profileImage: result.secure_url,
    },
    {
      new: true,
      upsert: true,
      runValidators: true,
      setDefaultsOnInsert: true,
    }
  );

  return personal;
};

export default {
  updatePersonal,
  getPersonal,
  uploadProfileImage,
};