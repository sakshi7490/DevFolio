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
import cloudinaryService from "../../services/cloudinary.service.js";
import Analytics from "../analytics/analytics.model.js";
import crypto from "crypto";

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

const getAllPortfoliosForAdmin = async () => {
  return await Portfolio.find()
    .populate("userId", "name email")
    .sort({ createdAt: -1 });
};

const deletePortfolioByAdmin = async (portfolioId) => {
  const portfolio = await Portfolio.findByIdAndDelete(portfolioId);

  if (!portfolio) {
    throw new ApiError(404, "Portfolio not found");
  }

  return portfolio;
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

const getPublicPortfolio = async (slug, req) => {
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
  const visitorId = crypto
  .createHash("sha256")
  .update(req.ip || "unknown")
  .digest("hex");

  await Analytics.create({
  portfolioId,
  eventType: "portfolio_view",
  visitorId,
  userAgent: req.get("user-agent") || "",
});

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

const getPortfolioForReview = async (portfolioId, userId) => {
  const portfolio = await Portfolio.findOne({
    _id: portfolioId,
    userId,
  });

  if (!portfolio) {
    throw new ApiError(404, "Portfolio not found");
  }

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

const getPublicResume = async (slug, req) => {
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

  const visitorId = crypto
  .createHash("sha256")
  .update(req.ip || "unknown")
  .digest("hex");

await Analytics.create({
  portfolioId: portfolio._id,
  eventType: "resume_download",
  visitorId,
  userAgent: req.get("user-agent") || "",
});

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

const uploadPortfolioImage = async (
  portfolioId,
  userId,
  file
) => {
  const portfolio = await Portfolio.findOne({
    _id: portfolioId,
    userId,
  });

  if (!portfolio) {
    throw new ApiError(404, "Portfolio not found");
  }

  if (!file) {
    throw new ApiError(400, "Portfolio image is required");
  }

  const result = await cloudinaryService.uploadImage(
    file.buffer,
    "devfolio/portfolios"
  );

  portfolio.featuredImage = result.secure_url;

  await portfolio.save();

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
  getAllPortfoliosForAdmin,
  deletePortfolioByAdmin,
  getSinglePortfolio,
  getPublicPortfolio,
  getPublicResume,
  deletePortfolio,
  updatePortfolioSettings,
  uploadPortfolioImage,
  getPortfolioForReview,
};