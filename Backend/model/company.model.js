import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
    {
        companyName: {
            type: String,
            required: true
        },

        description: {
            type: String,
            default: ""
        },

        website: {
            type: String,
            default: ""
        },

        location: {
            type: String,
            default: ""
        },

        // Stores the unique MongoDB ID of the user (recruiter) who created this company
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",   // links this field directly to your User collection
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const Company = mongoose.model(
    "Company",
    companySchema
);

export default Company;