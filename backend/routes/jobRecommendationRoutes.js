// routes/jobRecommendationRoutes.js
import express from "express";
import { recommendJobs } from "../controllers/JobRecommendationController.js"; // استيراد الدالة
import isAuthenticated from "../middleware/isAuth.js"; // الميدل وير للتأكد من التوثيق

const router = express.Router();

// Route للوصول لوظائف التوصية
router.route("/recommend").get(isAuthenticated, recommendJobs);

export default router;
