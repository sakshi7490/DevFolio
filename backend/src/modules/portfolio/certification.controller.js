import asyncHandler from "../../utils/asyncHandler.js";
import * as certificationService from "./certification.service.js";

export const createCertification = asyncHandler(
  async (req, res) => {
    const certification =
      await certificationService.createCertification(
        req.params.portfolioId,
        req.user._id,
        req.body
      );

    res.status(201).json({
      success: true,
      message: "Certification created successfully",
      data: certification,
    });
  }
);

export const getCertifications = asyncHandler(
  async (req, res) => {
    const certifications =
      await certificationService.getCertifications(
        req.params.portfolioId,
        req.user._id
      );

    res.status(200).json({
      success: true,
      message: "Certifications fetched successfully",
      data: certifications,
    });
  }
);

export const updateCertification = asyncHandler(
  async (req, res) => {
    const certification =
      await certificationService.updateCertification(
        req.params.certificationId,
        req.params.portfolioId,
        req.user._id,
        req.body
      );

    res.status(200).json({
      success: true,
      message: "Certification updated successfully",
      data: certification,
    });
  }
);

export const deleteCertification = asyncHandler(
  async (req, res) => {
    await certificationService.deleteCertification(
      req.params.certificationId,
      req.params.portfolioId,
      req.user._id
    );

    res.status(200).json({
      success: true,
      message: "Certification deleted successfully",
    });
  }
);