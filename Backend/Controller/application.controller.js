import { Application } from "../model/application.model.js";
import { Job } from "../model/job.model.js";
import { User } from "../model/user.model.js";

// APPLY FOR JOB
export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;

        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        const alreadyApplied = await Application.findOne({
            job: jobId,
            applicant: userId
        });

        if (alreadyApplied) {
            return res.status(400).json({
                message: "You have already applied for this job",
                success: false
            });
        }

        const application = await Application.create({
            job: jobId,
            applicant: userId
        });

        return res.status(201).json({
            message: "Job applied successfully",
            application,
            success: true
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

// GET MY APPLICATIONS
export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;

        const applications = await Application.find({
            applicant: userId
        })
            .populate({
                path: "job",
                populate: {
                    path: "company"
                }
            });

        return res.status(200).json({
            applications,
            success: true
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};


// GET APPLICANTS
export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;

        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        const applications = await Application.find({
            job: jobId
        })
            .populate("applicant")
            .populate("job");

        return res.status(200).json({
            applications,
            success: true
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};


// UPDATE APPLICATION STATUS
export const updateStatus = async (req, res) => {
    try {
        const applicationId = req.params.id;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({
                message: "Status is required",
                success: false
            });
        }

        const application = await Application.findById(applicationId);

        if (!application) {
            return res.status(404).json({
                message: "Application not found",
                success: false
            });
        }

        application.status = status;

        await application.save();

        return res.status(200).json({
            message: "Application status updated",
            application,
            success: true
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

// ========================================
// RECRUITER APPLICATION DASHBOARD
// ========================================

export const getApplicationStats = async (req, res) => {

    try {

        const userId = req.id;

        // Get jobs created by this recruiter
        const jobs = await Job.find({
            created_by: userId
        }).select("_id");

        const jobIds = jobs.map(
            (job) => job._id
        );

        // Get applications for recruiter's jobs
        const applications = await Application.find({
            job: { $in: jobIds }
        });

        const totalApplications =
            applications.length;

        const pendingApplications =
            applications.filter(
                (application) =>
                    application.status === "pending"
            ).length;

        const acceptedApplications =
            applications.filter(
                (application) =>
                    application.status === "accepted"
            ).length;

        const rejectedApplications =
            applications.filter(
                (application) =>
                    application.status === "rejected"
            ).length;

        return res.status(200).json({

            success: true,

            stats: {
                totalApplications,
                pendingApplications,
                acceptedApplications,
                rejectedApplications
            }

        });

    } catch (error) {

        console.log(
            "APPLICATION STATS ERROR:",
            error
        );

        return res.status(500).json({

            message: "Server error",

            success: false

        });

    }

};
