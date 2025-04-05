import { UseCaseResponse } from "../../entities/misc/useCaseResponse";
import ReviewInterface from "../../interfaces/ReviewInterface";

export default class DeleteReviewUseCase {
  constructor(private reviewRepository: ReviewInterface) {}

  // input: reviewId
  // output: deletes the review.
  execute = async (reviewId: string): Promise<UseCaseResponse> => {
    try {
      await this.reviewRepository.delete(reviewId);
      return {
        success: true,
        message: "Review deleted successfully",
      };
    } catch (error) {
      console.log("error in delete review use case", error);
      return {
        success: false,
        message: "error in delete review use case",
        err: error,
      };
    }
  };
}
