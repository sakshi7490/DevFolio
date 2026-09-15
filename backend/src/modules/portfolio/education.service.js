import Education from "./education.model.js";
import Portfolio from "./portfolio.model.js";
import ApiError from "../../utils/ApiError.js";
import { sanitizeText } from "../../utils/helpers.js";

const createEducation = async (portfolioId, userId, data) => {
  const portfolio = await Portfolio.findOne({
    _id: portfolioId,
    userId,
  });

  if (!portfolio) {
    throw new ApiError(404, "Portfolio not found");
  }

  const education = await Education.create({
    portfolioId,
    institution: sanitizeText(data.institution),
    degree: sanitizeText(data.degree),
    fieldOfStudy: sanitizeText(data.fieldOfStudy),
    startDate: data.startDate,
    endDate: data.endDate,
    description: sanitizeText(data.description),
  });

  return education;
};

const getEducation = async (portfolioId, userId) => {
  const portfolio = await Portfolio.findOne({
    _id: portfolioId,
    userId,
  });

  if (!portfolio) {
    throw new ApiError(404, "Portfolio not found");
  }

  return Education.find({ portfolioId }).sort({ startDate: -1 });
};

const updateEducation = async (
  educationId,
  portfolioId,
  userId,
  data
) => {
  const portfolio = await Portfolio.findOne({
    _id: portfolioId,
    userId,
  });

  if (!portfolio) {
    throw new ApiError(404, "Portfolio not found");
  }

  const updateData = { ...data };

  ["institution", "degree", "fieldOfStudy", "description"].forEach(
    (field) => {
      if (updateData[field] !== undefined) {
        updateData[field] = sanitizeText(updateData[field]);
      }
    }
  );

  const education = await Education.findOneAndUpdate(
    {
      _id: educationId,
      portfolioId,
    },
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!education) {
    throw new ApiError(404, "Education record not found");
  }

  return education;
};

const deleteEducation = async (
  educationId,
  portfolioId,
  userId
) => {
  const portfolio = await Portfolio.findOne({
    _id: portfolioId,
    userId,
  });

  if (!portfolio) {
    throw new ApiError(404, "Portfolio not found");
  }

  const education = await Education.findOneAndDelete({
    _id: educationId,
    portfolioId,
  });

  if (!education) {
    throw new ApiError(404, "Education record not found");
  }

  return education;
};

export {
  createEducation,
  getEducation,
  updateEducation,
  deleteEducation,
};