import express from "express";

// Import all the controller functions that handle the actual business logic for companies
import {
    registerCompany,
    getCompany,
    getCompanyById,
    updateCompany,
    deleteCompany
} from "../Controller/company.controller.js";

// Import the security middleware to make sure only logged-in users can access these routes
import isAuthentication from "../middleware/isAuthentication.js";

// Create a new router instance to manage our company-related URLs
const router = express.Router();

// Create a Company (POST request to /api/v1/company/register)
// Checks if the user is logged in first, then runs the registerCompany logic
router.route("/register").post(
    isAuthentication,
    registerCompany
);


// Get companies
router.route("/").get(
    isAuthentication,
    getCompany
);


// Get company by ID
router.route("/:id").get(
    isAuthentication,
    getCompanyById
);


// Update company
router.route("/:id").put(
    isAuthentication,
    updateCompany
);


// Delete company
router.route("/:id").delete(
    isAuthentication,
    deleteCompany
);


export default router;