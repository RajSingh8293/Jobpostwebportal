import express, { Router } from "express";
import {
  isAuthenticated,
  recruiterAuth,
} from "../middleware/auth.middleware.js";
import {
  applyForJob,
  getAllApplicantesAndSingleJob,
  getAppliedMyJobs,
  updatetStatus,
} from "../controllers/application.controllers.js";
import { upload } from "../middleware/file.middleware.js";

const router = Router();
// applicant
router.post(
  "/application/apply/:id",
  upload.single("resume"),
  isAuthenticated,
  applyForJob
);

router.get(
  "/application/get-applied-myjobs",
  isAuthenticated,
  getAppliedMyJobs
);

// recruiter
router.get(
  "/application/get/:id",
  isAuthenticated,
  getAllApplicantesAndSingleJob
);

// recruiter
// router.get("/application/get", getAllApplications);
router.put(
  "/application/:id/update-status",
  isAuthenticated,
  recruiterAuth,
  updatetStatus
);

export default router;
