import express, { Router } from "express";
import {
  adminDeleteJobById,
  createJob,
  deleteJobById,
  getAllJobs,
  getJobById,
  getRecruiterJob,
  updateLogoJob,
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

// recruiter jobs
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
