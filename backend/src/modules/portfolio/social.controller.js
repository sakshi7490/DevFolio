import asyncHandler from "../../utils/asyncHandler.js";
import socialService from "./social.service.js";

export const updateSocial = asyncHandler(
  async (req, res) => {
    const social = await socialService.updateSocial(
      req.params.portfolioId,
      req.user._id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Social links updated successfully",
      data: social,
    });
  }
);

export const getSocial = asyncHandler(
  async (req, res) => {
    const social = await socialService.getSocial(
      req.params.portfolioId,
      req.user._id
    );

    res.status(200).json({
      success: true,
      message: "Social links fetched successfully",
      data: social,
    });
  }
);