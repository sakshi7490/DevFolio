import {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
  uploadProjectImage,
} from "./project.service.js";

import asyncHandler from "../../utils/asyncHandler.js";

const create = asyncHandler(async (req, res) => {
  const project = await createProject(
    req.user._id,
    req.params.portfolioId,
    req.body
  );

  res.status(201).json({
    success: true,
    message: "Project created successfully",
    data: project,
  });
});

const getAll = asyncHandler(async (req, res) => {
  const projects = await getProjects(
    req.user._id,
    req.params.portfolioId
  );

  res.status(200).json({
    success: true,
    data: projects,
  });
});

const getOne = asyncHandler(async (req, res) => {
  const project = await getProject(
    req.user._id,
    req.params.portfolioId,
    req.params.projectId
  );

  res.status(200).json({
    success: true,
    data: project,
  });
});

const update = asyncHandler(async (req, res) => {
  const project = await updateProject(
    req.user._id,
    req.params.portfolioId,
    req.params.projectId,
    req.body
  );

  res.status(200).json({
    success: true,
    message: "Project updated successfully",
    data: project,
  });
});

const remove = asyncHandler(async (req, res) => {
  await deleteProject(
    req.user._id,
    req.params.portfolioId,
    req.params.projectId
  );

  res.status(200).json({
    success: true,
    message: "Project deleted successfully",
  });
});

const uploadImage = asyncHandler(async (req, res) => {
  const project = await uploadProjectImage(
    req.params.portfolioId,
    req.user._id,
    req.params.projectId,
    req.file
  );

  res.status(200).json({
    success: true,
    message: "Project image uploaded successfully",
    data: project,
  });
});

export {
  create,
  getAll,
  getOne,
  update,
  remove,
  uploadImage,
};