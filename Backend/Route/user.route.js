import express from "express";
import { register, login, logout, updateProfile } from "../Controller/user.controller.js";
import isAuthentication from "../middleware/isAuthentication.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/profile/update").put(isAuthentication, updateProfile);

export default router;