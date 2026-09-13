import asyncHandler from "../../utils/asyncHandler.js";
import aboutService from "./about.service.js";

export const updateAbout = asyncHandler(
  async (req, res) => {
    const about = await aboutService.updateAbout(
      req.params.portfolioId,
      req.user._id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "About section updated successfully",
      data: about,
    });
  }
);

export const getAbout = asyncHandler(
  async (req, res) => {
    const about = await aboutService.getAbout(
      req.params.portfolioId,
      req.user._id
    );

    res.status(200).json({
      success: true,
      message: "About section fetched successfully",
      data: about,
    });
  }
);