import dns from 'dns'; 
dns.setServers(['8.8.8.8', '8.8.4.4']);

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";    
const app = express();
import connectDb from "./utils/db.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./Route/user.route.js";
import companyRoute from "./Route/company.route.js";
import jobRoute from "./Route/job.route.js";
import applicationRoute from "./Route/application.route.js";


dotenv.config({})

// middleWare
app.use(express.json());
app.use (express.urlencoded({ extended: true}));
app.use(cookieParser());
const corsOption = {
    origin: "http://localhost:5173",
    credentials: true
}
app.use (cors(corsOption));

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