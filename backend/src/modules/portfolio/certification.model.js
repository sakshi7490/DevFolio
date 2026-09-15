import mongoose from "mongoose";

const certificationSchema = new mongoose.Schema(
  {
    portfolioId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Portfolio",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: [true, "Certification name is required"],
      trim: true,
      maxlength: 200,
    },

    issuer: {
      type: String,
      required: [true, "Issuer is required"],
      trim: true,
      maxlength: 200,
    },

    issueDate: {
      type: Date,
    },

    credentialUrl: {
      type: String,
      trim: true,
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

const Certification = mongoose.model(
  "Certification",
  certificationSchema
);

export default Certification;