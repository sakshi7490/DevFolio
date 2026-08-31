import User from "./user.model.js";

// Find user by ID
export const findUserById = async (userId) => {
  return await User.findById(userId).select("-password");
};

// Update user by ID
export const updateUserById = async (userId, updateData) => {
  return await User.findByIdAndUpdate(
    userId,
    updateData,
    {
      new: true,
      runValidators: true,
    }
  ).select("-password");
};