import Application from "../models/Application.js";
import Job from "../models/job.model.js";
import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// create job  post
export const applyForJob = asyncHandler(async (req, res) => {
  try {
    const user = req.user;
    const jobId = req.params.id;
    const { name, email, phone, address } = req.body;

    if (!name || !email || !phone || !address) {
      return res.status(422).json({ message: "All fields required !" });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(400).json({
        message: "Job not found!",
      });
    }

    const existingApplication = await Application.findOne({
      jobId: jobId,
      "applicant.userId": user._id,
    });

    if (existingApplication) {
      return res.status(200).json({
        message: "You have already applied for this job!",
      });
    }

    const applicant = {
      userId: user?._id,
      name,
      email,
      phone,
      address,
    };

    const finename = req.file?.path;

    if (!finename) {
      return res.status(422).json({ message: "Please choose file!" });
    } else {
      const image = await uploadOnCloudinary(finename);
      applicant.resume = {
        public_id: image.public_id,
        url: image.secure_url,
      };
    }
    const jobCanApply = await Application.create({
      applicant,
      jobId: jobId,
    });

    job.applications.push(jobCanApply._id);
    const jobsave = await job.save();

    // console.log("jobsave :", jobsave);

    res.status(201).json({
      message: "Job applied succefully",
      success: true,
      application: jobsave,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
});

// get jobs by logged in user get
export const getAppliedMyJobs = async (req, res) => {
  try {
    const user = req.user;
    const application = await Application.find({
      "applicant.userId": user._id,
    })
      .sort({ createdAt: -1 })
      .populate({
        path: "jobId",
        options: { sort: { createdAt: -1 } },
      });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Successfully",
      application,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// get users who applied for a particuler job
export const getAllApplicantesAndSingleJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      // populate: {
      //   path: "applicant",
      // },
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Successfully",
      applicants: job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

// update status
export const updatetStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    console.log("applicationId :", applicationId);
    if (!status) {
      return res.status(404).json({
        success: false,
        message: "status is required",
      });
    }
    // find the applicatio by id
    const application = await Application.findOne({ _id: applicationId });
    // console.log("application :", application);
    if (!application) {
      return res.status(404).json({
        success: false,
        message: "application not found",
      });
    }

    // update status
    application.status = status.toLowerCase();
    await application.save();

    res.status(200).json({
      success: true,
      message: "Status updated Successfully",
      application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

// export const getAllApplications = async (req, res) => {
//   try {
//     const applications = await Application.find();
//     if (!applications) {
//       return res.status(404).json({
//         success: false,
//         message: "application not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       applications,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Something went wrong",
//       error,
//     });
//   }
// };
