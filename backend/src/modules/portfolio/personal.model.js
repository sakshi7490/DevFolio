import mongoose from "mongoose";

const personalSchema = new mongoose.Schema(
  {
    portfolioId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Portfolio",
      required: true,
      unique: true,
      index: true,
    },

    name: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    headline: {
      type: String,
      trim: true,
      maxlength: 200,
    },

    location: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    profileImage: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Personal = mongoose.model("Personal", personalSchema);

export default Personal;