import asyncHandler from "../../utils/asyncHandler.js";

import {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
} from "./auth.service.js";


export const register = asyncHandler(async (req, res) => {
  const result = await registerUser(req.body);

 res.status(201).json({
  success: true,
  message: "User registered successfully",
  data: {
    user: result.user,
    token: result.token,
  },
});
});


export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const result = await loginUser(email, password);

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: result,
  });
});


export const getMe = asyncHandler(async (req, res) => {
  const user = await getCurrentUser(req.user._id);

  res.status(200).json({
    success: true,
    data: user,
  });
});


export const logout = asyncHandler(async (req, res) => {
  const result = await logoutUser();

  res.status(200).json({
    success: true,
    message: result.message,
  });
});