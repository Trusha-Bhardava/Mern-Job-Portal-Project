import { Job } from "../model/job.model.js";


// CREATE JOB
export const postJob = async (req, res) => {
    try {
        const {
            title,
            description,
            requirements,
            salary,
            location,
            jobType,
            experience,
            position,
            companyId
        } = req.body;

        if (
            !title ||
            !description ||
            !requirements ||
            !salary ||
            !location ||
            !jobType ||
            !experience ||
            !position ||
            !companyId
        ) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }
 
        // Saves the new job data into MongoDB
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),  // Converts a comma-separated string into an array of strings
            salary,
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,     // Stores the company reference ID
            created_by: req.id
        });

        return res.status(201).json({
            message: "New job created successfully",
            job,
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


// GET ALL JOBS
export const getAllJobs = async (req, res) => {
    try {
        // Look at the URL bar to see if the user typed a search keyword
        const keyword = req.query.keyword || "";

        // Setup a search rule to look for that keyword inside the Title OR the Description
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },    // "i" means ignore uppercase/lowercase
                { description: { $regex: keyword, $options: "i" } }   // Search inside descriptions too
            ]
        };

        // Find the matching jobs in the database
        const jobs = await Job.find(query)
            .populate("company")   // Instead of just a company ID, fetch and show the actual Company details
            .sort({ createdAt: -1 });  // Show the newest job postings at the very top of the list

        return res.status(200).json({
            jobs,
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


// GET JOB BY ID
export const getJobById = async (req, res) => {
    try {
        // Grab the job ID from the URL path
        const jobId = req.params.id;

        // Search the database for that exact ID
        const job = await Job.findById(jobId)
            .populate("company");   // Fetch the connected company info too

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        return res.status(200).json({
            job,
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


// GET JOBS CREATED BY CURRENT USER
export const getAdminJobs = async (req, res) => {
    try {
        //Look through the database and find jobs where 'created_by' matches your login ID
        const jobs = await Job.find({
            created_by: req.id
        }).populate("company");

        // Send your personal list of posted jobs back to you
        return res.status(200).json({
            jobs,
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


// DELETE JOB
export const deleteJob = async (req, res) => {
    try {
        //  Get the job ID from the URL path
        const jobId = req.params.id;

        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }
        
        // Security check! Make sure the logged-in user is the one who originally created this job
        if (job.created_by.toString() !== req.id) {
            return res.status(403).json({
                message: "You are not authorized to delete this job",
                success: false
            });
        }

        //  If they are the owner, delete it from the database permanently
        await Job.findByIdAndDelete(jobId);

        return res.status(200).json({
            message: "Job deleted successfully",
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