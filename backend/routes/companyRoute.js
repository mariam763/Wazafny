import express from "express";
import isAuthenticated from "../middleware/isAuth.js";
import {
  getCompany,
  getCompanyById,
  registerCompany,
  updateCompany,
  deleteCompany,
} from "../controllers/companyController.js";
import { singleUpload } from "../middleware/multer.js";


const router = express.Router();

router.route("/register").post(isAuthenticated, registerCompany);
router.route("/get").get(isAuthenticated, getCompany);
router.route("/get/:id").get(isAuthenticated, getCompanyById);
router.route("/update/:id").put(isAuthenticated,singleUpload, updateCompany);
router.route("/delete/:id").put(isAuthenticated, deleteCompany);

export default router;
