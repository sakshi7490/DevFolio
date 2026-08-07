import {
  createUser,
  emailExists,
  findUserByEmail,
  findUserById,
  updateLastLogin,
} from "./auth.repository.js";

import { generateAccessToken } from "../../services/jwt.service.js";

import ApiError from "../../utils/ApiError.js";


const registerUser = async (userData) => {
  const { name, email, password } = userData;

  // Check if email already exists
  const exists = await emailExists(email);

  if (exists) {
    throw new ApiError(409, "Email already exists");
  }

  // Create user
  const user = await createUser({
    name,
    email,
    password,
  });

  // Generate JWT
  const token = generateAccessToken(user._id);

  return {
    user,
    token,
  };
};

const loginUser = async (email, password) => {
  // Find user
  const user = await findUserByEmail(email);

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  // Compare password
  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new ApiError(401, "Invalid email or password");
  }

  // Update last login
  await updateLastLogin(user._id);

  // Generate JWT
  const token = generateAccessToken(user._id);

  return {
    user,
    token,
  };
};


const getCurrentUser = async (userId) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};

const logoutUser = async () => {
  return {
    message: "Logged out successfully",
  };
};

export {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
};