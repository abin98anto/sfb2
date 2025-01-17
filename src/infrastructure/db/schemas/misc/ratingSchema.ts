import mongoose, { Schema } from "mongoose";

const ratingSchema = new Schema({
  tutorId: { type: Schema.Types.ObjectId, ref: "User" },
  stars: { type: Number, default: 0 },
  comments: String,
});

export const RatingModel = mongoose.model("Rating", ratingSchema);
