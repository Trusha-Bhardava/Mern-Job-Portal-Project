import { User } from "../model/user.model.js";
import Company from "../model/company.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ================= REGISTER =================

// ================= REGISTER =================

const register = async (req, res) => {

    try {

        const {
            fullname,
            email,
            phoneNumber,
            password,
            role,

            // Company information
            companyName,
            companyDescription,
            companyWebsite,
            companyLocation
        } = req.body;


        // =========================
        // BASIC VALIDATION
        // =========================

        if (
            !fullname ||
            !email ||
            !phoneNumber ||
            !password ||
            !role
        ) {

            return res.status(400).json({
                message: "Something is missing",
                success: false
            });

        }


        // =========================
        // CHECK EXISTING USER
        // =========================

        const existingUser = await User.findOne({
            email
        });


        if (existingUser) {

            return res.status(400).json({
                message: "User already exists with this email",
                success: false
            });

        }


        // =========================
        // RECRUITER COMPANY VALIDATION
        // =========================

        if (role === "recruiter") {

            if (
                !companyName ||
                !companyDescription ||
                !companyLocation
            ) {

                return res.status(400).json({
                    message:
                        "Please provide all required company information",
                    success: false
                });

            }

        }


        // =========================
        // HASH PASSWORD
        // =========================

        const hashedPassword = await bcrypt.hash(
            password,
            10
        );


        // =========================
        // CREATE USER
        // =========================

        const user = await User.create({

            fullName: fullname,

            email,

            phoneNumber,

            password: hashedPassword,

            role,

            profile: {
                bio: "",
                skills: []
            }

        });


        // =========================
        // CREATE COMPANY
        // ONLY FOR RECRUITER
        // =========================

        if (role === "recruiter") {

            await Company.create({

                companyName,

                description: companyDescription,

                website: companyWebsite || "",

                location: companyLocation,

                userId: user._id

            });

        }


        // =========================
        // SUCCESS
        // =========================

        return res.status(201).json({

            message:
                role === "recruiter"
                    ? "Recruiter account and company created successfully"
                    : "Account created successfully",

            success: true,

            user

        });


    } catch (error) {

        console.log(
            "REGISTER ERROR:",
            error
        );


        return res.status(500).json({

            message: "Internal server error",

            success: false

        });

    }

};


// ================= LOGIN =================

const login = async (req, res) => {
    try {
        const {
            email,
            password,
            role
        } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            });
        }

        const isPasswordMatched = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordMatched) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            });
        }

        if (role !== user.role) {
            return res.status(400).json({
                message: "Account does not exist with this role",
                success: false
            });
        }

        const tokenData = {
            userId: user._id
        };

        const token = jwt.sign(
            tokenData,
            process.env.SECRET_KEY,
            {
                expiresIn: "1d"
            }
        );

        return res
            .status(200)
            .cookie("token", token, {
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: "strict"
            })
            .json({
                message: `Welcome back ${user.fullName}`,
                user,
                success: true
            });

    } catch (error) {
        console.log("LOGIN ERROR:", error);

        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};


// ================= LOGOUT =================

const logout = async (req, res) => {
    try {

        return res
            .status(200)
            .cookie("token", "", {
                maxAge: 0,
                httpOnly: true,
                sameSite: "strict"
            })
            .json({
                message: "Logged out successfully",
                success: true
            });

    } catch (error) {
        console.log("LOGOUT ERROR:", error);

        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};


// ================= UPDATE PROFILE =================

const updateProfile = async (req, res) => {
    try {

        const {
            fullname,
            email,
            phoneNumber,
            bio,
            skills
        } = req.body;

        // Check authentication
        if (!req.id) {
            return res.status(401).json({
                message: "User is not authenticated",
                success: false
            });
        }

        const user = await User.findById(req.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        // Update basic information

        if (fullname) {
            user.fullName = fullname;
        }

        if (email) {
            user.email = email;
        }

        if (phoneNumber) {
            user.phoneNumber = phoneNumber;
        }


        // Make sure profile exists

        if (!user.profile) {
            user.profile = {
                bio: "",
                skills: []
            };
        }


        // Update bio

        if (bio !== undefined) {
            user.profile.bio = bio;
        }


        // Update skills

        if (skills !== undefined) {

            let skillsArray = [];

            // If frontend sends:
            // "JavaScript, React, Node.js"

            if (typeof skills === "string") {

                skillsArray = skills
                    .split(",")
                    .map((skill) => skill.trim())
                    .filter((skill) => skill !== "");

            }

            // If frontend sends:
            // ["JavaScript", "React", "Node.js"]

            else if (Array.isArray(skills)) {

                skillsArray = skills
                    .map((skill) => String(skill).trim())
                    .filter((skill) => skill !== "");

            }

            user.profile.skills = skillsArray;
        }


        // Save user

        await user.save();


        return res.status(200).json({
            message: "Profile updated successfully",
            user,
            success: true
        });

    } catch (error) {

        console.log("UPDATE PROFILE ERROR:", error);

        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};


// ================= EXPORT =================

export {
    register,
    login,
    logout,
    updateProfile
};