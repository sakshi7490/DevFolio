import {
  getUserProfile as getUserProfileService,
  updateUserProfile as updateUserProfileService,
  getAllUsers as getAllUsersService,
  updateUserBlockStatus as updateUserBlockStatusService,
} from "./user.service.js";

import asyncHandler from "../../utils/asyncHandler.js";

const getUserProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const profile = await getUserProfileService(userId);

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

const updateUserProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const updatedProfile = await updateUserProfileService(
      userId,
      req.body
    );

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

const getUsers = asyncHandler(async (req, res) => {
   const users = await getAllUsersService();

  res.status(200).json({
    success: true,
    data: {
      users,
    },
  });
});

const updateUserBlockStatus = asyncHandler(async (req, res) => {
  const { isBlocked } = req.body;

  const user = await updateUserBlockStatusService(
    req.params.userId,
    isBlocked
  );

  return res.status(200).json({
    success: true,
    message: isBlocked ? "User blocked successfully" : "User unblocked successfully",
    data: {
      user,
    },
  });
});

export {
  getUserProfile,
  updateUserProfile,
  getUsers,
  updateUserBlockStatus,

};