import {
  getUserProfile as getUserProfileService,
  updateUserProfile as updateUserProfileService,
} from "./user.service.js";

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

export {
  getUserProfile,
  updateUserProfile,
};