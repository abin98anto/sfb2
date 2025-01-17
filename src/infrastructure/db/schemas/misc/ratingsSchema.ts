import mongoose, { Schema } from "mongoose";

const ratingSchema = new Schema({
  tutorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  stars: Number,
  comments: String,
});

export const ratingModel = mongoose.model("Rating", ratingSchema);
