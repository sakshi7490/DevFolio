import User from "../user/user.model.js";

/**
 * Create a new user
 */
const createUser = async (userData) => {
  return await User.create(userData);
};

/**
 * Find user by email
 * Includes password because password field has select:false
 */
const findUserByEmail = async (email) => {
  return await User.findOne({ email }).select("+password");
};

/**
 * Find user by ID
 * Password is not returned
 */
const findUserById = async (userId) => {
  return await User.findById(userId);
};



/**
 * Update user's last login time
 */
const updateLastLogin = async (userId) => {
  return await User.findByIdAndUpdate(
    userId,
    {
      lastLogin: new Date(),
    },
    {
      new: true,
    }
  );
};

/**
 * Update user by ID
 */
const updateUserById = async (userId, updateData) => {
  return await User.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true,
  });
};

/**
 * Check whether email already exists
 */
const emailExists = async (email) => {
  return await User.exists({ email });
};

export {
  createUser,
  findUserByEmail,
  findUserById,
  updateLastLogin,
  updateUserById,
  emailExists,
};