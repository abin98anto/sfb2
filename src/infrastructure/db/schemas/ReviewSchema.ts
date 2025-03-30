import mongoose, { Schema } from "mongoose";
import IReview from "../../../core/entities/IReview";

const ReviewSchema = new Schema<IReview>(
  {
    ratings: { type: Number, required: true },
    comments: { type: String, required: true },
    userId: { type: String, required: true, ref: "User" },
    courseId: { type: String, required: true, ref: "Course" },
  },
  {
    timestamps: true,
  }
);

const ReviewModel = mongoose.model("Review", ReviewSchema);
export default ReviewModel;
