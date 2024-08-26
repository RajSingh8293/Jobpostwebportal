import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    applicant: {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
      },
      phone: {
        type: Number,
      },
      email: {
        type: String,
      },
      address: {
        type: String,
      },
      resume: {
        public_id: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Job",
    },
    status: {
      type: String,
      enum: ["pending", "processing", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Application = mongoose.model("Application", applicationSchema);
export default Application;
