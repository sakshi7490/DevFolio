import asyncHandler from "../../utils/asyncHandler.js";
import * as skillService from "./skill.service.js";

export const createSkill = asyncHandler(async (req, res) => {
  const skill = await skillService.createSkill(
    req.params.portfolioId,
    req.user._id,
    req.body
  );

  res.status(201).json({
    success: true,
    message: "Skill created successfully",
    data: skill,
  });
});

export const getSkills = asyncHandler(async (req, res) => {
  const skills = await skillService.getSkills(
    req.params.portfolioId,
    req.user._id
  );

  res.status(200).json({
    success: true,
    message: "Skills fetched successfully",
    data: skills,
  });
});

export const updateSkill = asyncHandler(async (req, res) => {
  const skill = await skillService.updateSkill(
    req.params.skillId,
    req.params.portfolioId,
    req.user._id,
    req.body
  );

  res.status(200).json({
    success: true,
    message: "Skill updated successfully",
    data: skill,
  });
});

export const deleteSkill = asyncHandler(async (req, res) => {
  await skillService.deleteSkill(
    req.params.skillId,
    req.params.portfolioId,
    req.user._id
  );

  res.status(200).json({
    success: true,
    message: "Skill deleted successfully",
  });
});