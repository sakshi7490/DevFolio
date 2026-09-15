import mongoose from "mongoose";

const educationSchema = new mongoose.Schema(
  {
    portfolioId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Portfolio",
      required: true,
      index: true,
    },

    institution: {
      type: String,
      required: [true, "Institution name is required"],
      trim: true,
      maxlength: 200,
    },

    degree: {
      type: String,
      required: [true, "Degree is required"],
      trim: true,
      maxlength: 150,
    },

    fieldOfStudy: {
      type: String,
      trim: true,
      maxlength: 150,
    },

    startDate: {
      type: Date,
    },

    endDate: {
      type: Date,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
  },
  {
    timestamps: true,
  }
);

const Education = mongoose.model("Education", educationSchema);

export default Education;