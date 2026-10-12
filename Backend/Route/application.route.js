import express from "express";

import {
    applyJob,
    getAppliedJobs,
    getApplicants,
    updateStatus,
    getApplicationStats
} from "../Controller/application.controller.js";

import isAuthentication from "../middleware/isAuthentication.js";

const router = express.Router();


// Student applies for job
router.route("/apply/:id").post(
    isAuthentication,
    applyJob
);


// Student gets own applications
router.route("/get").get(
    isAuthentication,
    getAppliedJobs
);


// Recruiter gets applicants
router.route("/:id/applicants").get(
    isAuthentication,
    getApplicants
);


// Recruiter updates application status
router.route("/status/:id").put(
    isAuthentication,
    updateStatus
);

// Recruiter application dashboard
router.route("/stats").get(
    isAuthentication,
    getApplicationStats
);

export default router;