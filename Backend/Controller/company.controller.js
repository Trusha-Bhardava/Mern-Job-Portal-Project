// Import the Company model to interact with the companies collection in MongoDB
import Company from "../model/company.model.js";

// CREATE COMPANY

export const registerCompany = async (req, res) => {
    try {
         // Get the registration fields sent from the frontend request body
        const {
            companyName,
            description,
            website,
            location
        } = req.body;


        // Check company name
        if (!companyName) {

            return res.status(400).json({
                message: "Company name is required",
                success: false
            });

        }
       
         // Save the new company document to MongoDB
        const company = await Company.create({

            companyName,
            description,
            website,
            location,
            // Link the company to the logged-in user who made this request
            userId: req.id

        });

        return res.status(201).json({
            message: "Company registered successfully",
            company,
            success: true
        });

    } catch (error) {

        console.log("REGISTER COMPANY ERROR:", error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

// GET MY COMPANIES

export const getCompany = async (req, res) => {

    try {
  // Find all companies in the database created by this specific logged-in user ID
        const companies = await Company.find({
            userId: req.id
        });

        return res.status(200).json({
            companies,
            success: true
        });

    } catch (error) {
        console.log("GET COMPANY ERROR:", error);

        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};


// GET COMPANY BY ID

export const getCompanyById = async (req, res) => {

    try {
    // Extract the unique company ID string directly from the dynamic URL path parameter
        const companyId = req.params.id;

    // Search MongoDB for a single company document matching that exact ID
        const company = await Company.findById(companyId);

        if (!company) {

            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        }

        return res.status(200).json({
            company,
            success: true

        });

    } catch (error) {

        console.log("GET COMPANY BY ID ERROR:", error);

        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
}

// UPDATE COMPANY

export const updateCompany = async (req, res) => {

    try {

        const companyId = req.params.id;

        const {
            companyName,
            description,
            website,
            location
        } = req.body;

        const company = await Company.findById(companyId);

        if (!company) {

            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        }

         // Ensure only the original recruiter can modify this company
        if (company.userId.toString() !== req.id) {

            return res.status(403).json({
                message: "You are not authorized",
                success: false
            });
        }

         // When these fields are overwritten below, the original data is replaced.
        // The old names, descriptions, or URLs are permanently wiped from MongoDB.
        // They are no longer available in the API response unless tracked by history logs.
        company.companyName =
            companyName || company.companyName;

        company.description =
            description ?? company.description;

        company.website =
            website ?? company.website;

        company.location =
            location ?? company.location;


        await company.save();


        return res.status(200).json({
            message: "Company updated successfully",
            company,
            success: true
        });

    } catch (error) {

        console.log("UPDATE COMPANY ERROR:", error);

        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};


// DELETE COMPANY

export const deleteCompany = async (req, res) => {

    try {

        const companyId = req.params.id;

        const company = await Company.findById(companyId);


        if (!company) {

            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        }


        // Only owner can delete
        if (company.userId.toString() !== req.id) {

            return res.status(403).json({
                message: "You are not authorized",
                success: false
            });

        }


        await Company.findByIdAndDelete(companyId);

        return res.status(200).json({
            message: "Company deleted successfully",
            success: true
        });

    } catch (error) {

        console.log("DELETE COMPANY ERROR:", error);

        return res.status(500).json({
            message: "Server error",
            success: false
        });

    }

};