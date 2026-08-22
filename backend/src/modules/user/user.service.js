import { findUserById } from "./user.repository.js";
import ApiError from "../../utils/ApiError.js";

export const getUserProfile = async (userId) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};