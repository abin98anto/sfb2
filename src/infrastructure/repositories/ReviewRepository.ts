import IReview from "../../core/entities/IReview";
import ReviewInterface from "../../core/interfaces/ReviewInterface";
import { comments } from "../../shared/constants/comments";
import ReviewModel from "../db/schemas/ReviewSchema";

export default class ReviewRepository implements ReviewInterface {
  add = async (review: IReview): Promise<IReview> => {
    const newReview = new ReviewModel(review);
    await newReview.save();
    return newReview;
  };

  update = async (review: Partial<IReview>): Promise<IReview | null> => {
    const existingReview = await ReviewModel.findById(review._id);
    if (!existingReview) {
      throw new Error(comments.REVIEW_NOT_FOUND);
    }
    const updatedReview = await ReviewModel.findByIdAndUpdate(
      review._id,
      { $set: review },
      { new: true }
    );
    return updatedReview;
  };

  delete = async (reviewId: string): Promise<void> => {
    await ReviewModel.findByIdAndDelete(reviewId);
    return;
  };

  getAllCourseReviews = async (courseId: string): Promise<IReview[]> => {
    return await ReviewModel.find({ courseId }).populate("userId");
  };
}
