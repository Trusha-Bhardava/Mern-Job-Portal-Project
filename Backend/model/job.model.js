import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        requirements: {
            type: [String],   // This field must be an array of text strings
            default: []       // If nothing is provided, it starts as an empty list []
        },

        salary: {
            type: Number,
            required: true
        },

        location: {
            type: String,
            required: true
        },

        jobType: {
            type: String,
            required: true
        },

        experienceLevel: {
            type: String,
            required: true
        },

        position: {
            type: Number,
            required: true
        },

        company: {
            type: mongoose.Schema.Types.ObjectId,  // Saves a unique database ID from another collection
            ref: "Company",                        // Connects this field to the "Company" model
            required: true
        },

        created_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const Job = mongoose.model("Job", jobSchema);