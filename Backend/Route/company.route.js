import express from "express";

import {
    registerCompany,
    getCompany,
    getCompanyById,
    updateCompany,
    deleteCompany
} from "../Controller/company.controller.js";

import isAuthentication from "../middleware/isAuthentication.js";

const router = express.Router();


// Create company
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