import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema(
  {
    portfolioId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Portfolio",
      required: true,
      index: true,
    },

    eventType: {
      type: String,
      enum: ["portfolio_view", "resume_download", "project_view"],
      required: true,
      index: true,
    },

    visitorId: {
      type: String,
      required: true,
      index: true,
    },

    userAgent: {
      type: String,
      default: "",
    },

    createdAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: false,
  },
);

const Analytics = mongoose.model("Analytics", analyticsSchema);

export default Analytics;
