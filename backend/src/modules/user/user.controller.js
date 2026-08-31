<<<<<<< HEAD
const {
  getUserProfile,
  updateUserProfile,
} = require("./user.service");

const getProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const profile = await getUserProfile(userId);

    return res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      data: {
        user: profile,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const updatedProfile = await updateUserProfile(userId, req.body);

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: {
        user: updatedProfile,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfile,
  updateProfile,
};
=======
import asyncHandler from "../../utils/asyncHandler.js";

import {
  getUserProfile,
  updateUserProfile,
} from "./user.service.js";

export const getProfile = asyncHandler(async (req, res) => {
  const user = await getUserProfile(req.user._id);

  res.status(200).json({
    success: true,
    message: "Profile fetched successfully",
    data: user,
  });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const user = await updateUserProfile(
    req.user._id,
    req.body
  );

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    data: user,
  });
});
>>>>>>> 2ce68f34ee245e8af9c2d846267b7f2c54cebd7c
