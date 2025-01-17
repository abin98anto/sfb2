import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
console.log(process.env.MONGO_URI);

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI as string; // MongoDB connection string from .env
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
