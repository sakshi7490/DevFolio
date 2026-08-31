<<<<<<< HEAD
const User = require("./user.model");

const getUserProfile = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  return user.toSafeObject();
};

const updateUserProfile = async (userId, profileData) => {
  const user = await User.findById(userId);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  const allowedFields = [
    "name",
    "headline",
    "bio",
    "location",
    "phone",
    "website",
    "profileImage",
  ];

  allowedFields.forEach((field) => {
    if (profileData[field] !== undefined) {
      user[field] =
        typeof profileData[field] === "string"
          ? profileData[field].trim()
          : profileData[field];
    }
  });

  if (profileData.socialLinks !== undefined) {
    user.socialLinks = {
      github:
        profileData.socialLinks.github !== undefined
          ? profileData.socialLinks.github.trim()
          : user.socialLinks?.github || "",

      linkedin:
        profileData.socialLinks.linkedin !== undefined
          ? profileData.socialLinks.linkedin.trim()
          : user.socialLinks?.linkedin || "",

      twitter:
        profileData.socialLinks.twitter !== undefined
          ? profileData.socialLinks.twitter.trim()
          : user.socialLinks?.twitter || "",
    };
  }

  await user.save();

  return user.toSafeObject();
};

module.exports = {
  getUserProfile,
  updateUserProfile,
=======
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
>>>>>>> 2ce68f34ee245e8af9c2d846267b7f2c54cebd7c
};