import express from "express";
import isAuthenticated from "../middleware/isAuth.js";
import { generateResume } from "../controllers/resumeBuilderController.js";

const router = express.Router();

router.route("/generate").post(isAuthenticated, generateResume);



export default router;
