import api from "../../api/axios";

const createPortfolio = async (portfolioData) => {
  const response = await api.post("/portfolios", portfolioData);

  return response.data;
};
const uploadPortfolioImage = async (portfolioId, imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await api.post(
    `/portfolios/${portfolioId}/image`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

const getPortfolios = async () => {
  const response = await api.get("/portfolios");

  return response.data;
};

const getPortfolio = async (id) => {
  const response = await api.get(`/portfolios/${id}`);

  return response.data;
};

const deletePortfolio = async (id) => {
  const response = await api.delete(`/portfolios/${id}`);

  return response.data;
};

const updatePortfolioSettings = async (id, settings) => {
  const response = await api.patch(
    `/portfolios/${id}/settings`,
    settings
  );

  return response.data;
};


const getPersonal = async (portfolioId) => {
  const response = await api.get(
    `/portfolios/${portfolioId}/personal`
  );

  return response.data;
};

const updatePersonal = async (portfolioId, personalData) => {
  const response = await api.put(
    `/portfolios/${portfolioId}/personal`,
    personalData
  );

  return response.data;
};

const getAbout = async (portfolioId) => {
  const response = await api.get(
    `/portfolios/${portfolioId}/about`
  );

  return response.data;
};

const updateAbout = async (portfolioId, aboutData) => {
  const response = await api.put(
    `/portfolios/${portfolioId}/about`,
    aboutData
  );

  return response.data;
};

const getSocial = async (portfolioId) => {
  const response = await api.get(
    `/portfolios/${portfolioId}/social`
  );

  return response.data;
};

const updateSocial = async (portfolioId, socialData) => {
  const response = await api.put(
    `/portfolios/${portfolioId}/social`,
    socialData
  );

  return response.data;
};

const uploadProfileImage = async (portfolioId, file) => {
  const formData = new FormData();
  formData.append("profileImage", file);

  const response = await api.post(
    `/portfolios/${portfolioId}/personal/image`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};


const getSkills = async (portfolioId) => {
  const response = await api.get(
    `/portfolios/${portfolioId}/skills`
  );
  return response.data;
};

const createSkill = async (portfolioId, skillData) => {
  const response = await api.post(
    `/portfolios/${portfolioId}/skills`,
    skillData
  );
  return response.data;
};

const updateSkill = async (
  portfolioId,
  skillId,
  skillData
) => {
  const response = await api.patch(
    `/portfolios/${portfolioId}/skills/${skillId}`,
    skillData
  );
  return response.data;
};

const deleteSkill = async (portfolioId, skillId) => {
  const response = await api.delete(
    `/portfolios/${portfolioId}/skills/${skillId}`
  );
  return response.data;
};


const getEducation = async (portfolioId) => {
  const response = await api.get(
    `/portfolios/${portfolioId}/education`
  );

  return response.data;
};

const createEducation = async (
  portfolioId,
  educationData
) => {
  const response = await api.post(
    `/portfolios/${portfolioId}/education`,
    educationData
  );

  return response.data;
};

const updateEducation = async (
  portfolioId,
  educationId,
  educationData
) => {
  const response = await api.patch(
    `/portfolios/${portfolioId}/education/${educationId}`,
    educationData
  );

  return response.data;
};

const deleteEducation = async (
  portfolioId,
  educationId
) => {
  const response = await api.delete(
    `/portfolios/${portfolioId}/education/${educationId}`
  );

  return response.data;
};


const getCertifications = async (portfolioId) => {
  const response = await api.get(
    `/portfolios/${portfolioId}/certifications`
  );

  return response.data;
};

const createCertification = async (
  portfolioId,
  certificationData
) => {
  const response = await api.post(
    `/portfolios/${portfolioId}/certifications`,
    certificationData
  );

  return response.data;
};

const updateCertification = async (
  portfolioId,
  certificationId,
  certificationData
) => {
  const response = await api.patch(
    `/portfolios/${portfolioId}/certifications/${certificationId}`,
    certificationData
  );

  return response.data;
};

const deleteCertification = async (
  portfolioId,
  certificationId
) => {
  const response = await api.delete(
    `/portfolios/${portfolioId}/certifications/${certificationId}`
  );

  return response.data;
};

const getProjects = async (portfolioId) => {
  const response = await api.get(
    `/portfolios/${portfolioId}/projects`
  );

  return response.data;
};

const createProject = async (
  portfolioId,
  projectData
) => {
  const response = await api.post(
    `/portfolios/${portfolioId}/projects`,
    projectData
  );

  return response.data;
};

const updateProject = async (
  portfolioId,
  projectId,
  projectData
) => {
  const response = await api.patch(
    `/portfolios/${portfolioId}/projects/${projectId}`,
    projectData
  );

  return response.data;
};

const deleteProject = async (
  portfolioId,
  projectId
) => {
  const response = await api.delete(
    `/portfolios/${portfolioId}/projects/${projectId}`
  );

  return response.data;
};


const getExperiences = async (portfolioId) => {
  const response = await api.get(
    `/portfolios/${portfolioId}/experiences`
  );

  return response.data;
};

const createExperience = async (portfolioId, experienceData) => {
  const response = await api.post(
    `/portfolios/${portfolioId}/experiences`,
    experienceData
  );

  return response.data;
};

const updateExperience = async (
  portfolioId,
  experienceId,
  experienceData
) => {
  const response = await api.patch(
    `/portfolios/${portfolioId}/experiences/${experienceId}`,
    experienceData
  );

  return response.data;
};

const deleteExperience = async (portfolioId, experienceId) => {
  const response = await api.delete(
    `/portfolios/${portfolioId}/experiences/${experienceId}`
  );

  return response.data;
};


const uploadProjectImage = async (
  portfolioId,
  projectId,
  file
) => {
  const formData = new FormData();

  formData.append("projectImage", file);

  const response = await api.post(
    `/portfolios/${portfolioId}/projects/${projectId}/image`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

const getPublicPortfolio = async (slug) => {
  const response = await api.get(
    `/portfolios/public/${slug}`
  );

  return response.data;
};

const getAnalyticsSummary = async (
  portfolioId,
  startDate,
  endDate
) => {
  const params = {};

  if (startDate) params.startDate = startDate;
  if (endDate) params.endDate = endDate;

  const response = await api.get(
    `/analytics/${portfolioId}`,
    { params }
  );

  return response.data;
};

const generateAbout = async (data) => {
  const response = await api.post("/ai/about", data);
  return response.data;
};

const improveGrammar = async (data) => {
  const response = await api.post("/ai/improve-grammar", data);
  return response.data;
};

const improveProjectDescription = async (data) => {
  const response = await api.post(
    "/ai/project-description",
    data
  );

  return response.data;
};

const suggestSkills = async (data) => {
  const response = await api.post(
    "/ai/suggest-skills",
    data
  );

  return response.data;
};

const reviewPortfolio = async (portfolioId) => {
  const response = await api.post("/ai/review", {
    portfolioId,
  });

  return response.data;
};


const uploadResume = async (formData) => {
  const response = await api.post("/resume/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

const importResumeData = async (data) => {
  const response = await api.post("/resume/import", data);
  return response.data;
};

const connectGithub = async (username) => {
  const response = await api.post("/github/connect", {
    username,
  });

  return response.data;
};

const importGithubRepositories = async (portfolioId, repositories) => {
  const response = await api.post("/github/import", {
    portfolioId,
    repositories,
  });

  return response.data;
};

export default {
  createPortfolio,
  uploadPortfolioImage,
  getPortfolios,
  getPortfolio,
  getAnalyticsSummary,
  uploadProfileImage,
  getAbout,
  updateAbout,
  getSocial,
  updateSocial,

  getPersonal,
  updatePersonal,
  deletePortfolio,
  updatePortfolioSettings,
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
  getEducation,
  createEducation,
  updateEducation,
  deleteEducation,
  getCertifications,
  createCertification,
  updateCertification,
  deleteCertification,
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
  uploadProjectImage,
  getPublicPortfolio,

  generateAbout,
  improveGrammar,
  improveProjectDescription,
  suggestSkills,
  reviewPortfolio,
  uploadResume,
  importResumeData,
  connectGithub,
  importGithubRepositories,

};