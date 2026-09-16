import Project from "./project.model.js";
import ApiError from "../../utils/ApiError.js";
import Portfolio from "./portfolio.model.js";
import cloudinary from "../../config/cloudinary.js";

const createProject = async (userId, portfolioId, data) => {
  const project = await Project.create({
    portfolioId,
    ...data,
  });

  return project;
};

const getProjects = async (userId, portfolioId) => {
  const projects = await Project.find({ portfolioId }).sort({
    createdAt: -1,
  });

  return projects;
};

const getProject = async (userId, portfolioId, projectId) => {
  const project = await Project.findOne({
    _id: projectId,
    portfolioId,
  });

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  return project;
};

const updateProject = async (
  userId,
  portfolioId,
  projectId,
  data
) => {
  const project = await Project.findOneAndUpdate(
    {
      _id: projectId,
      portfolioId,
    },
    data,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  return project;
};

const deleteProject = async (
  userId,
  portfolioId,
  projectId
) => {
  const project = await Project.findOneAndDelete({
    _id: projectId,
    portfolioId,
  });

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  return project;
};


const uploadProjectImage = async (
  portfolioId,
  projectId,
  userId,
  file
) => {
  const project = await Project.findOne({
    _id: projectId,
    portfolioId,
  });

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  if (!file) {
    throw new ApiError(400, "Project image is required");
  }

  const result = await cloudinary.uploader.upload(
    file.path,
    {
      folder: "devfolio/projects",
    }
  );

  project.image = result.secure_url;

  await project.save();

  return project;
};

export {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
  uploadProjectImage,
};