import IReview from "../entities/IReview";

export default interface ReviewInterface {
  add(review: IReview): Promise<IReview>;
  update(review: Partial<IReview>): Promise<IReview | null>;
  delete(reviewId: string): Promise<void>;
  getAllCourseReviews(courseId: string): Promise<IReview[]>;
}
