import asyncHandler from "../../utils/asyncHandler.js";
import * as educationService from "./education.service.js";

export const createEducation = asyncHandler(async (req, res) => {
  const education = await educationService.createEducation(
    req.params.portfolioId,
    req.user._id,
    req.body
  );

  res.status(201).json({
    success: true,
    message: "Education created successfully",
    data: education,
  });
});

export const getEducation = asyncHandler(async (req, res) => {
  const education = await educationService.getEducation(
    req.params.portfolioId,
    req.user._id
  );

  res.status(200).json({
    success: true,
    message: "Education fetched successfully",
    data: education,
  });
});

export const updateEducation = asyncHandler(async (req, res) => {
  const education = await educationService.updateEducation(
    req.params.educationId,
    req.params.portfolioId,
    req.user._id,
    req.body
  );

  res.status(200).json({
    success: true,
    message: "Education updated successfully",
    data: education,
  });
});

export const deleteEducation = asyncHandler(async (req, res) => {
  await educationService.deleteEducation(
    req.params.educationId,
    req.params.portfolioId,
    req.user._id
  );

  res.status(200).json({
    success: true,
    message: "Education deleted successfully",
  });
});