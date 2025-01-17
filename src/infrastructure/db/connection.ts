import mongoose from "mongoose";
import dotenv from "dotenv";
import { comments } from "../../shared/constants/comments";
dotenv.config();

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI as string;
    await mongoose.connect(mongoURI);
    console.log(comments.MONGO_SUCC);
  } catch (error) {
    console.error(comments.MONGO_FAIL, error);
    process.exit(1);
  }
};

export default connectDB;
