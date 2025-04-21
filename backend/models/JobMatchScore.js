import mongoose from "mongoose";

const jobMatchScoreSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    matchPercentage: {
      type: Number,
      required: true,
    },
    rank: {
      type: Number,
      default: null, // <- This is new
    },
  },
  { timestamps: true }
);

jobMatchScoreSchema.index({ user: 1, job: 1 }, { unique: true });

export const JobMatchScore = mongoose.model(
  "JobMatchScore",
  jobMatchScoreSchema
);
