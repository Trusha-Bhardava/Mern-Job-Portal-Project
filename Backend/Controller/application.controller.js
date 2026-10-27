import { Application } from "../model/application.model.js";
import { Job } from "../model/job.model.js";

// APPLY FOR JOB
export const applyJob = async (req, res) => {
    try {
        const userId = req.id;  // Grabs the logged-in user's ID from our authentication middleware
        const jobId = req.params.id;   // Grabs the target job's ID from the URL link parameters
 
        // Look up the job in the database to see if it even exists
        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        // Search the database to see if this user already applied to this specific job
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

        //  Everything looks clean, create the new application link document
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
        // Get the logged-in user's ID
        const userId = req.id;

        // Find all applications that belong to this specific student/user
        const applications = await Application.find({
            applicant: userId
        })
            .populate({
                path: "job",  // Grab the detailed data of the job they applied for
                populate: {
                    path: "company"   // Dig deeper and grab the full company info inside that job document
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

        // Find all applicant files submitted to this specific job ID
        const applications = await Application.find({
            job: jobId
        })
            .populate("applicant")  // Replace the applicant ID with the user's name, email, profile details, etc.
            .populate("job");       // Replace the job ID with full details of the role

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
        const { status } = req.body;  //  // Extract the new choice sent from the frontend

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

        // Update the document's tracking status with the decision
        application.status = status;

        // Explicitly save the updated status changes back to MongoDB
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

      // find all job documents posted by this specific recruiter, but only download the ID strings
        const jobs = await Job.find({
            created_by: userId
        }).select("_id");

        // '.select("_id")' trims out data bloat by only downloading the document IDs
        const jobIds = jobs.map(
            (job) => job._id
        );

        // look up all applications globally where the job field matches any ID inside our array list
        const applications = await Application.find({
            job: { $in: jobIds }
        });

        // Calculate total raw quantity numbers
        const totalApplications =
            applications.length;

        // Filter the items to tally total counts for pending status applications
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
            // Return the bundled calculation stats back to render graphical panels or counters
            status: {
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
