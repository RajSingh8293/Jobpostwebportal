import mongoose from "mongoose";

const savedJobSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Job",
    },
  },
  { timestamps: true }
);

const SavedJob = mongoose.model("SavedJob", savedJobSchema);
export default SavedJob;
