// Local ISPs often fail to resolve MongoDB's complex +srv connection strings.
// By importing 'dns' and setting Google (8.8.8.8) and Cloudflare (1.1.1.1) as servers,
// we bypass the local network to guarantee a successful database connection.
import dns from 'dns'; 
dns.setServers(['8.8.8.8', '8.8.4.4']);

import express from "express";

// Middleware to parse and read cookies from incoming requests
import cookieParser from "cookie-parser";
import cors from "cors";  
import connectDb from "./utils/db.js";
import dotenv from "dotenv";

// Import specific route handlers for different parts of the application API
import userRoute from "./Route/user.route.js";
import companyRoute from "./Route/company.route.js";
import jobRoute from "./Route/job.route.js";
import applicationRoute from "./Route/application.route.js";

// Initialize environment variables so they can be accessed via process.env
dotenv.config({})

const app = express();

//  allows to parse middleware for understand json
app.use(express.json());
// Parses incoming urlencoded data 
app.use (express.urlencoded({ extended: true}));
// Enables the app to read cookies attached to client requests
app.use(cookieParser());

const corsOption = {
    origin: "http://localhost:5173",
    credentials: true   // Allows the frontend to send and receive secure HTTP cookies
}
// Apply the CORS rules globally to all incoming requests
app.use (cors(corsOption));

// Define API Route Endpoints
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/application", applicationRoute);
app.use("/api/v1/user", userRoute);

const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
    res.send("Backend is working!");
});

app.listen(8000, "127.0.0.1", () => {
    connectDb();
    console.log("Backend running at http://127.0.0.1:8000");
});