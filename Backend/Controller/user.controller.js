// Import the database schemas/models to perform data operations in MongoDB
import { User } from "../model/user.model.js";
import Company from "../model/company.model.js";

// Import cryptographical and token utilities for security operations
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req, res) => {

    try {
 // Extract form variables sent by the frontend application from the request body
        const {
            fullname,
            email,
            phoneNumber,
            password,
            role,

             // Recruiter specific information extracted from the same request payload
            companyName,
            companyDescription,
            companyWebsite,
            companyLocation
        } = req.body;

 // Block processing immediately if mandatory shared fields are empty or missing
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
 // Scan MongoDB to see if another account is already utilizing the provided email address
        const existingUser = await User.findOne({
            email
        });


        if (existingUser) {

            return res.status(400).json({
                message: "User already exists with this email",
                success: false
            });

        }

        // RECRUITER COMPANY VALIDATION
        if (role === "recruiter") {

            if (
                !companyName ||
                !companyDescription ||
                !companyLocation
            ) 
            {
                return res.status(400).json({
                    message:
                        "Please provide all required company information",
                    success: false
                });
            }
        }   
        // Convert the plain-text password into hashpassword 
        const hashedPassword = await bcrypt.hash( password,10);

        // Commit and save the new user record profile blueprint details into the database
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

        // CREATE COMPANY ONLY FOR RECRUITER
      
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


    } 
    catch (error)
     {
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
         // Collect identifying target parameter arguments sent by the login form   
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
 // Send back a success response, attaching the token as a secure, HTTP-only cookie
        const tokenData = {
            userId: user._id
        };
  // Generate the JSON Web Token
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
                httpOnly: true,   // Blocks client-side JavaScript scripts from reading this cookie
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

            //  If a new bio was typed, save it , Update bio
            if (bio !== undefined) {
                user.profile.bio = bio;
            }

            // If new skills were provided, format them correctly into an array, Update skills

            if (skills !== undefined) {

                let skillsArray = [];

             // Case A: If skills are sent as a single text string (e.g., "React, Node, Java")
            // Split them by commas, remove extra spaces, and clear out empty entries
                if (typeof skills === "string")
                {
                    skillsArray = skills
                        .split(",")
                        .map((skill) => skill.trim())
                        .filter((skill) => skill !== "");

                }
            // Case B: If skills are already sent as a list array (e.g., ["React", "Node"])
            // Clean up the text spaces for each skill item in the list
                else if (Array.isArray(skills)) {

                    skillsArray = skills
                        .map((skill) => String(skill).trim())
                        .filter((skill) => skill !== "");

                }
            // Save the cleaned, polished array list of skills into the user's profile
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