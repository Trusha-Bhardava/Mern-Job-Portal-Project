import mongoose from "mongoose";

const connectDb = async () => {
    try
    {
         await mongoose.connect(process.env.MONGO_URI);
         console.log ("mongodb connected successfully");
    }
    catch  (error)
    {
        console.log ("error in connecting database");
         console.error("Error Message:", error.message);
        console.error("Full Error details:", error);
    }
}

export default connectDb;