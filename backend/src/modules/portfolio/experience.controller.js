import {
  createExperience,
  getExperiences,
  getExperience,
  updateExperience,
  deleteExperience,
} from "./experience.service.js";

import asyncHandler from "../../utils/asyncHandler.js";

const create = asyncHandler(async (req, res) => {
  const experience = await createExperience(
    req.user._id,
    req.params.portfolioId,
    req.body
  );

  res.status(201).json({
    success: true,
    message: "Experience created successfully",
    data: experience,
  });
});

const getAll = asyncHandler(async (req, res) => {
  const experiences = await getExperiences(
    req.user._id,
    req.params.portfolioId
  );

  res.status(200).json({
    success: true,
    data: experiences,
  });
});

const getOne = asyncHandler(async (req, res) => {
  const experience = await getExperience(
    req.user._id,
    req.params.portfolioId,
    req.params.experienceId
  );

  res.status(200).json({
    success: true,
    data: experience,
  });
});

const update = asyncHandler(async (req, res) => {
  const experience = await updateExperience(
    req.user._id,
    req.params.portfolioId,
    req.params.experienceId,
    req.body
  );

  res.status(200).json({
    success: true,
    message: "Experience updated successfully",
    data: experience,
  });
});

const remove = asyncHandler(async (req, res) => {
  await deleteExperience(
    req.user._id,
    req.params.portfolioId,
    req.params.experienceId
  );

  res.status(200).json({
    success: true,
    message: "Experience deleted successfully",
  });
});

export {
  create,
  getAll,
  getOne,
  update,
  remove,
};