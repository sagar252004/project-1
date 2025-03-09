import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { deleteJob, getAdminJobs, getAllJobs, getJobById, postJob, updateJob } from "../controllers/jobController.js";
import { singleUpload } from "../middlewares/multer.js";



const router = express.Router();

router.route("/post").post(isAuthenticated,postJob);
router.route("/get").get(getAllJobs);
router.route("/getadminJobs").get(isAuthenticated,getAdminJobs);
router.route("/get/:id").get(isAuthenticated,getJobById);
router.route("/update/:id").put(isAuthenticated,singleUpload, updateJob);
router.route("/:id").delete(isAuthenticated,deleteJob);

export default router;
