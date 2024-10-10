import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    logo: {
      public_id: {
        type: String,
        default: "",
      },
      url: {
        type: String,
        default: "",
      },
    },
    title: { type: String, required: true },
    company: { type: String, required: true },
    salary: { type: Number, required: true },
    category: { type: String, required: true },

    location: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },

    skills: { type: [String], required: true },
    description: { type: String, required: true },

    jobRole: { type: String, required: true },
    maxPositions: { type: Number, required: true },
    jobType: { type: String, required: true },
    experienceLevel: { type: String, required: true },
    companyWebsite: {
      type: String,
    },
    rating: {
      type: Number,
      default: 0,
    },
    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);
export default Job;
