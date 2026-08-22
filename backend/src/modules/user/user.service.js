import { findUserById, updateUserById, } from "./user.repository.js";
import ApiError from "../../utils/ApiError.js";

export const getUserProfile = async (userId) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};



// Update Profile
export const updateUserProfile = async (userId, updateData) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const updatedUser = await updateUserById(userId, updateData);

  return updatedUser;
};