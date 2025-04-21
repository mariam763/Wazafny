import express from "express";
import isAuthenticated from "../middleware/isAuth.js";
import {
  getRecruiterJobs,
  getAllJobs,
  getJobById,
  postJob,
  deleteJob,
  
} from "../controllers/jobController.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, postJob);


router.route("/get").get( getAllJobs);

router.route("/getrecruiterjobs").get(isAuthenticated, getRecruiterJobs);
router.route("/get/:id").get(isAuthenticated, getJobById);
router.route("/delete/:id").put(isAuthenticated, deleteJob);
router.route("/delete/:id").put(isAuthenticated, deleteJob);


export default router;
