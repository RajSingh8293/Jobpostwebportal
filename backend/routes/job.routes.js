import express, { Router } from "express";
import {
  adminDeleteJobById,
  createJob,
  createMultipleJobs,
  deleteJobById,
  getAllJobs,
  getJobById,
  getRecruiterJob,
  deleteMultipleJobs,
  updateLogoJob,
  updateJob,
} from "../controllers/job.controllers.js";
import {
  isAuthenticated,
  recruiterAuth,
} from "../middleware/auth.middleware.js";
import { upload } from "../middleware/file.middleware.js";

const router = Router();

// user
router.get("/job/get/:id", getJobById);
router.get("/job/get", getAllJobs);

// insert data
router.post("/job/create-many", createMultipleJobs);
router.delete("/job/create-many", deleteMultipleJobs);

// recruiter jobs
router.put("/job/update/:id", isAuthenticated, recruiterAuth, updateJob);
router.post("/job/create", isAuthenticated, recruiterAuth, createJob);

router.get(
  "/job/get/recruiter/jobs",
  isAuthenticated,
  recruiterAuth,
  getRecruiterJob
);
router.delete("/job/delete/:id", isAuthenticated, recruiterAuth, deleteJobById);
router.put(
  "/job/update/image/:id",
  upload.single("logo"),
  isAuthenticated,
  recruiterAuth,
  updateLogoJob
);

// admin
router.delete("/job/admin-delete/:id", adminDeleteJobById);

export default router;
