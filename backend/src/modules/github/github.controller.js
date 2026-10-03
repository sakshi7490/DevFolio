import asyncHandler from "../../utils/asyncHandler.js";
import githubService from "./github.service.js";
import Project from "../portfolio/project.model.js";

export const getGithubData = asyncHandler(async (req, res) => {
  const { username } = req.body;

  if (!username?.trim()) {
    return res.status(400).json({
      success: false,
      message: "GitHub username is required",
    });
  }

  const data = await githubService.getGithubData(
    username.trim(),
  );

  res.status(200).json({
    success: true,
    message: "GitHub data fetched successfully",
    data,
  });
});


export const importGithubRepositories = asyncHandler(async (req, res) => {
  const { portfolioId, repositories } = req.body;

  if (!portfolioId) {
    return res.status(400).json({
      success: false,
      message: "Portfolio ID is required",
    });
  }

  if (!repositories?.length) {
    return res.status(400).json({
      success: false,
      message: "At least one repository is required",
    });
  }

  const importedProjects = [];

for (const repo of repositories) {
  const existingProject = await Project.findOne({
    portfolioId,
    githubId: repo.githubId,
  });

  if (existingProject) {
    continue;
  }

  const project = await Project.create({
    portfolioId,
    githubId: repo.githubId,
    title: repo.title,
    description: repo.description,
    technologies: repo.technologies,
    githubUrl: repo.githubUrl,
    projectUrl: repo.projectUrl,
  });

  importedProjects.push(project);
}

res.status(201).json({
  success: true,
  message: `${importedProjects.length} repositories imported successfully`,
  data: importedProjects,
});
});