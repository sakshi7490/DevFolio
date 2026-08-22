import asyncHandler from "../../utils/asyncHandler.js";
import { getUserProfile } from "./user.service.js";

export const getProfile = asyncHandler(async (req, res) => {
  const user = await getUserProfile(req.user._id);

  res.status(200).json({
    success: true,
    message: "Profile fetched successfully",
    data: user,
  });
});