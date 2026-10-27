// Import the express framework to handle HTTP routing configurations
import express from "express";
import { register, login, logout, updateProfile } from "../Controller/user.controller.js";
// Import the authentication guard middleware to secure specific endpoints
import isAuthentication from "../middleware/isAuthentication.js";

// Create a new Express Router instance to group user-related endpoints together
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/profile/update").put(isAuthentication, updateProfile);

export default router;