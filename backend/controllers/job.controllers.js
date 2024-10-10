import Job from "../models/job.model.js";
import fs from "fs";
import { deleteOnCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";
import User from "../models/user.model.js";
import SavedJob from "../models/saveJob.model.js";
import { jobsData } from "../data/data.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createMultipleJobs = asyncHandler(async (req, res) => {
  try {
    await Job.deleteMany();
    const jobs = await Job.insertMany(jobsData);
    if (!jobs) {
      res.status(400).json({
        message: "Jobs not created",
        success: false,
      });
      return;
    }
    res.status(201).json({
      message: "Jobs is created succefully",
      success: true,
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something wrong with creating multiple jobs",
      error,
    });
  }
});

export const deleteMultipleJobs = asyncHandler(async (req, res) => {
  try {
    const jobs = await Job.deleteMany();
    if (!jobs) {
      res.status(400).json({
        message: "Jobs not deleted",
        success: false,
      });
      return;
    }
    res.status(201).json({
      message: "Jobs is deleted succefully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something wrong with creating multiple jobs",
      error,
    });
  }
});
// create job user
export const createJob = asyncHandler(async (req, res) => {
  try {
    const {
      title,
      company,
      salary,
      category,

      location,
      address,
      city,
      skills,

      companyWebsite,
      description,
      jobRole,
      maxPositions,

      jobType,
      experienceLevel,
    } = req.body;

    const user = req.user;

    if (!title || !company) {
      return res.status(422).json({ message: "All fileds are required !" });
    }

    const job = await Job.create({
      title,
      company,
      salary: Number(salary),
      category,
      description,
      skills: skills.split(","),
      experienceLevel,
      city,
      location,
      maxPositions: Number(maxPositions),
      address,
      companyWebsite,
      jobRole,
      jobType,
      createdBy: user._id,
    });

    if (!job) {
      res.status(400).json({
        message: "Job not created",
        success: false,
      });
      return;
    }
    res.status(201).json({
      message: "Job is created succefully",
      success: true,
      job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something wrong with creating job",
      error,
    });
  }
});

export const getAllJobs = asyncHandler(async (req, res) => {
  try {
    const {
      category,
      city,
      jobType,
      experienceLevel,
      minSalary,
      maxSalary,
      skills,
      page,
      searchKeyword,
    } = req.query;

    const limit = 12;
    // page = 1,
    const currentPage = Number(page) || 1;
    const skip = limit * (currentPage - 1);
    const filters = {};
    if (category) filters.category = category;
    if (city) filters.city = city;
    if (jobType) filters.jobType = jobType;
    if (experienceLevel) filters.experienceLevel = experienceLevel;
    if (minSalary || maxSalary) {
      filters.salary = {};
      if (minSalary) filters.salary.$gte = Number(minSalary);
      if (maxSalary) filters.salary.$lte = Number(maxSalary);
    }
    if (skills) {
      filters.skills = { $all: skills.split(",") };
    }

    if (searchKeyword) {
      filters.$or = [
        { title: { $regex: searchKeyword, $options: "i" } },
        { description: { $regex: searchKeyword, $options: "i" } },
        { company: { $regex: searchKeyword, $options: "i" } },
      ];
    }

    const jobs = await Job.find(filters).skip(skip).limit(limit).populate({
      path: "applications",
    });
    const totalJobs = await Job.countDocuments(filters);
    // const totalJobs = await Job.countDocuments();

    res.status(200).json({
      totalJobs,
      totalPages: Math.ceil(totalJobs / limit),
      currentPage,
      jobsLength: jobs?.length,
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching jobs",
      error,
    });
  }
});

// get job by id user
export const getJobById = asyncHandler(async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate({
      path: "applications",
    });

    if (!job) {
      return res.status(400).json({
        success: false,
        message: "Job not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Successfully",
      job,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

// update job
export const updateLogoJob = asyncHandler(async (req, res) => {
  try {
    let job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const file = req.file?.path;
    console.log("file : ", file);
    await deleteOnCloudinary(job?.logo?.public_id);
    const image = await uploadOnCloudinary(file);

    if (file) {
      // user.profile.resume = image.secure_url;
      job.logo = {
        public_id: image.public_id,
        url: image.url,
      };
    }

    const jobData = await job.save();

    res.status(200).json({
      success: true,
      message: "Profile Updated successfully",
      job: jobData,
    });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Error with updating user", error });
  }
});
// save data in using heart button
export const updateJob = asyncHandler(async (req, res) => {
  const {
    title,
    company,
    salary,
    category,

    location,
    address,
    city,
    skills,

    companyWebsite,
    description,
    jobRole,
    maxPositions,

    jobType,
    experienceLevel,
  } = req.body;
  try {
    const user = req.user;
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      {
        title,
        company,
        salary: Number(salary),
        category,
        description,
        skills: skills.split(","),
        experienceLevel,
        city,
        location,
        maxPositions: Number(maxPositions),
        address,
        companyWebsite,
        jobRole,
        jobType,
        createdBy: user._id,
      },
      {
        new: true,
      }
    );
    if (!job) return res.status(404).json({ error: "Job not found" });
    res.status(200).json({
      success: true,
      message: "Job updated successefully",
      job,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// delete job by id
export const deleteJobById = asyncHandler(async (req, res) => {
  try {
    let job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(400).json({
        success: false,
        message: "Job not found",
      });
    }

    job = await Job.findByIdAndDelete(job);
    res.status(200).json({
      success: true,
      message: "Job Deleted Successfully",
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

// get all jobs by recruiter
export const getRecruiterJob = asyncHandler(async (req, res) => {
  const {
    category,
    city,
    jobType,
    experienceLevel,
    minSalary,
    maxSalary,
    skills,
    sortBy,
    page,
    searchKeyword,
    sortOrder,
  } = req.query;
  try {
    const limit = 12;
    const currentPage = Number(page) || 1;
    const skip = limit * (currentPage - 1);
    const user = req.user;
    const jobs = await Job.find({ createdBy: user._id })
      .skip(skip)
      .limit(limit)
      .populate({
        path: "applications",
      });

    // const jobs = await Job.find(user._id);
    const totalJobs = await Job.countDocuments();
    if (!jobs) {
      res.status(400).json({
        message: "Jobs not found",
        success: false,
      });
      return;
    }

    res.status(200).json({
      message: "Jobs succefully",
      success: true,
      jobs,
      totalPages: Math.ceil(totalJobs / limit),
      currentPage,
      totalJobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something wrong with getting recruiter jobs",
      error,
    });
  }
});

// admin
// delete job by id
export const adminDeleteJobById = asyncHandler(async (req, res) => {
  try {
    let job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(400).json({
        success: false,
        message: "Job not found",
      });
    }

    job = await Job.findByIdAndDelete(job);
    res.status(200).json({
      success: true,
      message: "Job Deleted Successfully",
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

export const savedJobs = asyncHandler(async (req, res) => {
  try {
    const user = req.user;
    const jobId = await Job.findById(req.params.id);
    if (!jobId) {
      return res.status(400).json({
        success: false,
        message: "Job not found",
      });
    }

    const existingJob = await SavedJob.findOne({
      userId: user._id,
      jobId: jobId,
    });

    if (existingJob) {
      return res.status(200).json({
        message: "You have already saved for this job!",
      });
    }
    const jobCanSave = await SavedJob.create({
      userId: user._id,
      jobId: jobId,
    });

    user.savedJobs.push(jobCanSave);
    const jobsave = await user.save();

    res.status(200).json({
      success: true,
      jobsave,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something wrong with getting recruiter jobs",
      error,
    });
  }
});
