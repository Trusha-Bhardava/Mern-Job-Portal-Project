import express from "express";

import {
    postJob,
    getAllJobs,
    getJobById,
    getAdminJobs,
    deleteJob
} from "../Controller/job.controller.js";

import isAuthentication from "../middleware/isAuthentication.js";

const router = express.Router();


// Create job
router.route("/post").post(
    isAuthentication,
    postJob
);


// Get all jobs
router.route("/get").get(
    getAllJobs
);


// Get job by ID
router.route("/get/:id").get(
    getJobById
);


// Get jobs created by logged-in recruiter
router.route("/getadminjobs").get(
    isAuthentication,
    getAdminJobs
);


// Delete job
router.route("/delete/:id").delete(
    isAuthentication,
    deleteJob
);

export default router;