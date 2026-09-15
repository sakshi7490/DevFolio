import Certification from "./certification.model.js";
import Portfolio from "./portfolio.model.js";
import ApiError from "../../utils/ApiError.js";
import { sanitizeText, sanitizeUrl } from "../../utils/helpers.js";

const createCertification = async (portfolioId, userId, data) => {
  const portfolio = await Portfolio.findOne({
    _id: portfolioId,
    userId,
  });

  if (!portfolio) {
    throw new ApiError(404, "Portfolio not found");
  }

  const certification = await Certification.create({
    portfolioId,
    name: sanitizeText(data.name),
    issuer: sanitizeText(data.issuer),
    issueDate: data.issueDate,
    credentialUrl: sanitizeUrl(data.credentialUrl),
    description: sanitizeText(data.description),
  });

  return certification;
};

const getCertifications = async (portfolioId, userId) => {
  const portfolio = await Portfolio.findOne({
    _id: portfolioId,
    userId,
  });

  if (!portfolio) {
    throw new ApiError(404, "Portfolio not found");
  }

  return Certification.find({ portfolioId }).sort({
    issueDate: -1,
  });
};

const updateCertification = async (
  certificationId,
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

  ["name", "issuer", "description"].forEach((field) => {
    if (updateData[field] !== undefined) {
      updateData[field] = sanitizeText(updateData[field]);
    }
  });

  if (updateData.credentialUrl !== undefined) {
    updateData.credentialUrl = sanitizeUrl(
      updateData.credentialUrl
    );
  }

  const certification =
    await Certification.findOneAndUpdate(
      {
        _id: certificationId,
        portfolioId,
      },
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

  if (!certification) {
    throw new ApiError(404, "Certification not found");
  }

  return certification;
};

const deleteCertification = async (
  certificationId,
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

  const certification =
    await Certification.findOneAndDelete({
      _id: certificationId,
      portfolioId,
    });

  if (!certification) {
    throw new ApiError(404, "Certification not found");
  }

  return certification;
};

export {
  createCertification,
  getCertifications,
  updateCertification,
  deleteCertification,
};