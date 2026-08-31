<<<<<<< HEAD
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
=======
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
>>>>>>> 2ce68f34ee245e8af9c2d846267b7f2c54cebd7c

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
<<<<<<< HEAD
      minlength: [2, "Name must contain at least 2 characters"],
=======
      minlength: [2, "Name must be at least 2 characters"],
>>>>>>> 2ce68f34ee245e8af9c2d846267b7f2c54cebd7c
      maxlength: [50, "Name cannot exceed 50 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
<<<<<<< HEAD
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address",
=======
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
>>>>>>> 2ce68f34ee245e8af9c2d846267b7f2c54cebd7c
      ],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
<<<<<<< HEAD
      minlength: [8, "Password must contain at least 8 characters"],
      select: false,
    },

    profileImage: {
      type: String,
      default: "",
      trim: true,
    },

    headline: {
      type: String,
      default: "",
      trim: true,
      maxlength: [100, "Headline cannot exceed 100 characters"],
    },

    bio: {
      type: String,
      default: "",
      trim: true,
      maxlength: [500, "Bio cannot exceed 500 characters"],
    },

    location: {
      type: String,
      default: "",
      trim: true,
      maxlength: [100, "Location cannot exceed 100 characters"],
    },

    phone: {
      type: String,
      default: "",
      trim: true,
      maxlength: [20, "Phone number cannot exceed 20 characters"],
    },

    website: {
      type: String,
      default: "",
      trim: true,
    },

    socialLinks: {
      github: {
        type: String,
        default: "",
        trim: true,
      },

      linkedin: {
        type: String,
        default: "",
        trim: true,
      },

      twitter: {
        type: String,
        default: "",
        trim: true,
      },
    },

=======
      minlength: [8, "Password must be at least 8 characters"],
      select: false,
    },

>>>>>>> 2ce68f34ee245e8af9c2d846267b7f2c54cebd7c
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

<<<<<<< HEAD
    isEmailVerified: {
=======
    isVerified: {
>>>>>>> 2ce68f34ee245e8af9c2d846267b7f2c54cebd7c
      type: Boolean,
      default: false,
    },

<<<<<<< HEAD
    isBlocked: {
      type: Boolean,
      default: false,
    },

    lastLoginAt: {
=======
    profileImage: {
      type: String,
      default: "",
    },

    githubUsername: {
      type: String,
      trim: true,
      default: "",
    },

    portfolioCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    lastLogin: {
>>>>>>> 2ce68f34ee245e8af9c2d846267b7f2c54cebd7c
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

<<<<<<< HEAD
// Hash password before saving a new or modified password.
userSchema.pre("save", async function hashPassword(next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare login password with the stored hashed password.
userSchema.methods.comparePassword = async function comparePassword(
  candidatePassword
) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Return safe user data without sensitive fields.
userSchema.methods.toSafeObject = function toSafeObject() {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    profileImage: this.profileImage,
    headline: this.headline,
    bio: this.bio,
    location: this.location,
    phone: this.phone,
    website: this.website,
    socialLinks: this.socialLinks,
    role: this.role,
    isEmailVerified: this.isEmailVerified,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
=======


userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.toJSON = function () {
  const userObject = this.toObject();

  delete userObject.password;

  return userObject;
>>>>>>> 2ce68f34ee245e8af9c2d846267b7f2c54cebd7c
};

const User = mongoose.model("User", userSchema);

<<<<<<< HEAD
module.exports = User;
=======
export default User;
>>>>>>> 2ce68f34ee245e8af9c2d846267b7f2c54cebd7c
