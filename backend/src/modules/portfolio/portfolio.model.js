import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: [true, "Portfolio title is required"],
      trim: true,
      minlength: [3, "Portfolio title must be at least 3 characters"],
      maxlength: [100, "Portfolio title cannot exceed 100 characters"],
    },

    slug: {
      type: String,
      required: [true, "Portfolio slug is required"],
      trim: true,
      lowercase: true,
      unique: true,
      minlength: [3, "Portfolio slug must be at least 3 characters"],
      maxlength: [100, "Portfolio slug cannot exceed 100 characters"],
      match: [
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "Slug can only contain lowercase letters, numbers, and hyphens",
      ],
    },

    description: {
      type: String,
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },

    technologies: [
      {
        type: String,
        trim: true,
      },
    ],

    liveUrl: {
      type: String,
      trim: true,
    },

    githubUrl: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
      required: true,
    },
    template: {
      type: String,
      enum: ["minimal", "professional", "creative"],
      default: "minimal",
      required: true,
    },
    themeColor: {
      type: String,
      enum: ["orange", "blue", "green", "purple", "red"],
      default: "orange",
      required: true,
    },
    font: {
  type: String,
  enum: ["inter", "poppins", "serif", "mono"],
  default: "inter",
  required: true,
},
themeMode: {
  type: String,
  enum: ["light", "dark"],
  default: "dark",
  required: true,
},
    viewCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    featuredImage: {
      type: String,
      trim: true,
    },
    resumeUrl: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

export default Portfolio;
