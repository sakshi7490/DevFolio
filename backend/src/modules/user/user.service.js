import bcrypt from "bcryptjs";
import {findUserByEmail,createUser,findUserByEmailWithPassword,} from "./user.repository.js";
import { generateToken } from "../../utils/jwt.js";


//**************register***************
export const registerUser = async ({ name, email, password }) => {
    // 1. Check if user already exists
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
        throw new Error("Email already registered");
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create user
    const user = await createUser({
        name,
        email,
        password: hashedPassword,
    });

    // 4. Don't send password back
    const userResponse = user.toObject();
    delete userResponse.password;

    return userResponse;
};


//*********login***********
export const loginUser = async ({ email, password }) => {
  // 1. Find user
  const user = await findUserByEmailWithPassword(email);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  // 2. Compare password
  const isPasswordCorrect = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordCorrect) {
    throw new Error("Invalid email or password");
  }

  // 3. Generate JWT
  const token = generateToken(user._id.toString());

  // 4. Remove password from response
  const userResponse = user.toObject();
  delete userResponse.password;

  return {
    user: userResponse,
    token,
  };
};