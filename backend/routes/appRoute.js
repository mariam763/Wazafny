import express from "express";
import isAuthenticated from "../middleware/isAuth.js";
import {
  applyJob,
  getApplicants,
  getAppliedJobs,
  updateStatus,
} from "../controllers/appController.js";
import { parseResumeAndRank, getRankedApplicants } from "../controllers/resumeController.js";




const router = express.Router();

router.route("/apply/:id").get(isAuthenticated, applyJob);

router.route("/get").get(isAuthenticated, getAppliedJobs);
router.route("/parse-resume").post(isAuthenticated, parseResumeAndRank);
router.route("/:id/applicants").get(isAuthenticated, getApplicants);
router.route("/status/:id/update").post(isAuthenticated, updateStatus);

router.route
  ("/:jobId/ranked-applicants").get(isAuthenticated,getRankedApplicants)

export default router;
