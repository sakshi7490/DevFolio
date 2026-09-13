import mongoose from "mongoose";

const socialSchema = new mongoose.Schema(
  {
    portfolioId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Portfolio",
      required: true,
      unique: true,
      index: true,
    },

    github: {
      type: String,
      trim: true,
    },

    linkedin: {
      type: String,
      trim: true,
    },

    twitter: {
      type: String,
      trim: true,
    },

    instagram: {
      type: String,
      trim: true,
    },

    website: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Social = mongoose.model("Social", socialSchema);

export default Social;