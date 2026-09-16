import Experience from "./experience.model.js";
import ApiError from "../../utils/ApiError.js";

const createExperience = async (userId, portfolioId, data) => {
  const experience = await Experience.create({
    portfolioId,
    ...data,
  });

  return experience;
};

const getExperiences = async (userId, portfolioId) => {
  const experiences = await Experience.find({
    portfolioId,
  }).sort({
    startDate: -1,
  });

  return experiences;
};

const getExperience = async (
  userId,
  portfolioId,
  experienceId
) => {
  const experience = await Experience.findOne({
    _id: experienceId,
    portfolioId,
  });

  if (!experience) {
    throw new ApiError(404, "Experience not found");
  }

  return experience;
};

const updateExperience = async (
  userId,
  portfolioId,
  experienceId,
  data
) => {
  const experience = await Experience.findOneAndUpdate(
    {
      _id: experienceId,
      portfolioId,
    },
    data,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!experience) {
    throw new ApiError(404, "Experience not found");
  }

  return experience;
};

const deleteExperience = async (
  userId,
  portfolioId,
  experienceId
) => {
  const experience = await Experience.findOneAndDelete({
    _id: experienceId,
    portfolioId,
  });

  if (!experience) {
    throw new ApiError(404, "Experience not found");
  }

  return experience;
};

export {
  createExperience,
  getExperiences,
  getExperience,
  updateExperience,
  deleteExperience,
};