import Job from "../models/job.model.js";
import { deleteOnCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";

// create job user
export const createJob = async (req, res) => {
  try {
    const {
      title,
      company,
      minSalary,
      maxSalary,
      category,
      minExperience,
      maxExperience,
      location,
      address,
      skills,
      responsibilities,
      companyWebsite,
      description,
      jobRole,
      maxPositions,
      jobType,
    } = req.body;

    const user = req.user;

    if (!title || !company) {
      return res.status(422).json({ message: "All fileds are required !" });
    }

    const job = await Job.create({
      title,
      company,
      minSalary: Number(minSalary),
      maxSalary: Number(maxSalary),
      category,
      minExperience: Number(minExperience),
      maxExperience: Number(maxExperience),
      description,
      skills: skills.split(","),
      responsibilities: responsibilities.split("."),
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
};

// get all jobs
export const getAllJobs = async (req, res) => {
  try {
    const { city, category, searchKeyword } = req.query;
    // const [city, niche, searchKeyword] = req.query;

    const query = {};
    if (city) {
      query.location = city;
    }
    // if (location) {
    //   query.location = location;
    // }
    // if (title) {
    //   query.title = title;
    // }
    if (category) {
      query.category = category;
    }
    if (searchKeyword) {
      query.$or = [
        { title: { $regex: searchKeyword, $options: "i" } },
        { description: { $regex: searchKeyword, $options: "i" } },
        { company: { $regex: searchKeyword, $options: "i" } },
      ];
    }

    const jobs = await Job.find(query).populate({
      // const jobs = await Job.find().populate({
      path: "applications",
    });
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
      count: jobs.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something wrong with getting recruiter jobs",
      error,
    });
  }
};

// get job by id user
export const getJobById = async (req, res) => {
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
};

// update job
export const updateLogoJob = async (req, res) => {
  try {
    // const user = req.user;
    // if (user?.role !== "recruiter") {
    //   res.status(400).json({
    //     message: "You dont have permission to update logo",
    //     success: false,
    //   });
    //   return;
    // }

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
};

// delete job by id
export const deleteJobById = async (req, res) => {
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
};

// get all jobs by recruiter
export const getRecruiterJob = async (req, res) => {
  try {
    const user = req.user;
    // if (user?.role !== "recruiter") {
    //   res.status(400).json({
    //     message: "You dont have permission to get this information",
    //     success: false,
    //   });
    //   return;
    // }
    const jobs = await Job.find({ createdBy: user._id }).populate({
      path: "applications",
    });
    // const jobs = await Job.find(user._id);
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
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something wrong with getting recruiter jobs",
      error,
    });
  }
};

// admin
// delete job by id
export const adminDeleteJobById = async (req, res) => {
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
};
