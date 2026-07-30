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