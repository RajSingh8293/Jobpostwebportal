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
    title: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    minSalary: {
      type: Number,
      default: 0,
    },
    maxSalary: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
    },
    minExperience: {
      type: Number,
      default: 0,
    },
    maxExperience: {
      type: Number,
      default: 0,
    },

    location: {
      type: String,
    },
    address: {
      type: String,
    },
    skills: [{ type: String }],
    responsibilities: [
      {
        type: String,
      },
    ],
    description: {
      type: String,
    },
    jobRole: {
      type: String,
    },

    maxPositions: {
      type: Number,
      default: 0,
    },
    jobType: {
      type: String,
    },
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
