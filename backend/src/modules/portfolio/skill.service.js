import Skill from "./skill.model.js";
import Portfolio from "./portfolio.model.js";
import ApiError from "../../utils/ApiError.js";
import { sanitizeText } from "../../utils/helpers.js";

const createSkill = async (portfolioId, userId, data) => {
  const portfolio = await Portfolio.findOne({
    _id: portfolioId,
    userId,
  });

  if (!portfolio) {
    throw new ApiError(404, "Portfolio not found");
  }

  const skill = await Skill.create({
    portfolioId,
    name: sanitizeText(data.name),
    level: data.level,
  });

  return skill;
};

const getSkills = async (portfolioId, userId) => {
  const portfolio = await Portfolio.findOne({
    _id: portfolioId,
    userId,
  });

  if (!portfolio) {
    throw new ApiError(404, "Portfolio not found");
  }

  return Skill.find({ portfolioId }).sort({ createdAt: 1 });
};

const updateSkill = async (
  skillId,
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

  if (updateData.name !== undefined) {
    updateData.name = sanitizeText(updateData.name);
  }

  const skill = await Skill.findOneAndUpdate(
    {
      _id: skillId,
      portfolioId,
    },
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!skill) {
    throw new ApiError(404, "Skill not found");
  }

  return skill;
};

const deleteSkill = async (
  skillId,
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

  const skill = await Skill.findOneAndDelete({
    _id: skillId,
    portfolioId,
  });

  if (!skill) {
    throw new ApiError(404, "Skill not found");
  }

  return skill;
};

export {
  createSkill,
  getSkills,
  updateSkill,
  deleteSkill,
};