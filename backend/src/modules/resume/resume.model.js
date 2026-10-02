import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    portfolioId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Portfolio",
      required: true,
      index: true,
    },

    fileName: {
      type: String,
      required: true,
      trim: true,
    },

    fileSize: {
      type: Number,
      required: true,
    },

    mimeType: {
      type: String,
      required: true,
    },

    extractedText: {
      type: String,
      required: true,
    },

    resumeData: {
      skills: {
        type: [String],
        default: [],
      },

      education: {
  type: [
    {
      institution: {
        type: String,
        trim: true,
      },

      degree: {
        type: String,
        trim: true,
      },

      fieldOfStudy: {
        type: String,
        trim: true,
      },

      startDate: {
        type: String,
        trim: true,
      },

      endDate: {
        type: String,
        trim: true,
      },
    },
  ],
  default: [],
},

     projects: {
  type: [
    {
      title: {
        type: String,
        trim: true,
      },

      description: {
        type: String,
        trim: true,
      },

      technologies: {
        type: [String],
        default: [],
      },
    },
  ],
  default: [],
},
    },

    importedAt: {
  type: Date,
  default: null,
},
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Resume", resumeSchema);