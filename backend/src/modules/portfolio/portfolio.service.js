import Portfolio from "./portfolio.model.js";
import Personal from "./personal.model.js";
import About from "./about.model.js";
import Social from "./social.model.js";
import Skill from "./skill.model.js";
import Education from "./education.model.js";
import Certification from "./certification.model.js";
import Project from "./project.model.js";
import Experience from "./experience.model.js";
import ApiError from "../../utils/ApiError.js";

const createPortfolio = async (userId, portfolioData) => {
  const { title, slug, description, technologies, liveUrl, githubUrl, featuredImage, resumeUrl } =
    portfolioData;

  const existingPortfolio = await Portfolio.findOne({ slug });

  if (existingPortfolio) {
    throw new ApiError(409, "Portfolio with this slug already exists");
  }

  const portfolio = await Portfolio.create({
    userId,
    title,
    slug,
    description,
    technologies,
    liveUrl,
    githubUrl,
    featuredImage,
    resumeUrl,
  });

  return portfolio;
};

const getUserPortfolios = async (userId) => {
  const portfolios = await Portfolio.find({ userId })
    .sort({ createdAt: -1 });

  return portfolios;
};

const getSinglePortfolio = async (portfolioId, userId) => {
  const portfolio = await Portfolio.findOne({
    _id: portfolioId,
    userId,
  });

  if (!portfolio) {
    throw new ApiError(404, "Portfolio not found");
  }

  return portfolio;
};

const getPublicPortfolio = async (slug) => {
  const portfolio = await Portfolio.findOneAndUpdate(
    {
      slug,
      status: "published",
    },
    {
      $inc: { viewCount: 1 },
    },
    {
      new: true,
    }
  );

  if (!portfolio) {
    throw new ApiError(404, "Public portfolio not found");
  }

  const portfolioId = portfolio._id;

  const [
    personal,
    about,
    social,
    skills,
    education,
    certifications,
    projects,
    experience,
  ] = await Promise.all([
    Personal.findOne({ portfolioId }),
    About.findOne({ portfolioId }),
    Social.findOne({ portfolioId }),
    Skill.find({ portfolioId }),
    Education.find({ portfolioId }),
    Certification.find({ portfolioId }),
    Project.find({ portfolioId }),
    Experience.find({ portfolioId }),
  ]);

  return {
    portfolio,
    personal,
    about,
    social,
    skills,
    education,
    certifications,
    projects,
    experience,
  };
};

const getPublicResume = async (slug) => {
  const portfolio = await Portfolio.findOne({
    slug,
    status: "published",
  }).select("resumeUrl");

  if (!portfolio) {
    throw new ApiError(404, "Public portfolio not found");
  }

  if (!portfolio.resumeUrl) {
    throw new ApiError(404, "Resume not available");
  }

  return portfolio.resumeUrl;
};

const deletePortfolio = async (portfolioId, userId) => {
  const portfolio = await Portfolio.findOneAndDelete({
    _id: portfolioId,
    userId,
  });

  if (!portfolio) {
    throw new ApiError(404, "Portfolio not found");
  }

  return portfolio;
};

const updatePortfolioSettings = async (
  portfolioId,
  userId,
  settings
) => {
  const portfolio = await Portfolio.findOne({
    _id: portfolioId,
    userId,
  });

  if (!portfolio) {
    throw new ApiError(404, "Portfolio not found");
  }

  if (settings.slug && settings.slug !== portfolio.slug) {
    const existingPortfolio = await Portfolio.findOne({
      slug: settings.slug,
      _id: { $ne: portfolioId },
    });

    if (existingPortfolio) {
      throw new ApiError(
        409,
        "Portfolio with this slug already exists"
      );
    }
  }

  Object.assign(portfolio, settings);
  console.log("Before save:", portfolio.toObject());

  await portfolio.save();

  return portfolio;
};

export default {
  createPortfolio,
  getUserPortfolios,
  getSinglePortfolio,
  getPublicPortfolio,
  getPublicResume,
  deletePortfolio,
  updatePortfolioSettings,
};