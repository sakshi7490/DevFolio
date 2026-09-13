import asyncHandler from "../../utils/asyncHandler.js";
import personalService from "./personal.service.js";

export const updatePersonal = asyncHandler(
  async (req, res) => {
    const personal = await personalService.updatePersonal(
      req.params.portfolioId,
      req.user._id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Personal details updated successfully",
      data: personal,
    });
  }
);

export const getPersonal = asyncHandler(
  async (req, res) => {
    const personal = await personalService.getPersonal(
      req.params.portfolioId,
      req.user._id
    );

    res.status(200).json({
      success: true,
      message: "Personal details fetched successfully",
      data: personal,
    });
  }
);


export const uploadProfileImage = asyncHandler(
  async (req, res) => {
    const personal =
      await personalService.uploadProfileImage(
        req.params.portfolioId,
        req.user._id,
        req.file
      );

    res.status(200).json({
      success: true,
      message: "Profile image uploaded successfully",
      data: personal,
    });
  }
);