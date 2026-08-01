import { registerUser, loginUser } from "./user.service.js";



//*************** register controller**********
export const registerUserController = async (req, res, next) => {
  try {
    const user = await registerUser(req.body);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};



//*************login controller*************
export const loginUserController = async (req, res, next) => {
  try {
    const user = await loginUser(req.body);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user,
    });
  } catch (error) {
    next(error);
  }
};