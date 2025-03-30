import IReview from "../../entities/IReview";
import { UseCaseResponse } from "../../entities/misc/useCaseResponse";
import ReviewInterface from "../../interfaces/ReviewInterface";

export default class UpdateReviewUseCase {
  constructor(private reviewRepository: ReviewInterface) {}

  execute = async (review: Partial<IReview>): Promise<UseCaseResponse> => {
    try {
      const data = await this.reviewRepository.update(review);
      return { success: true, data };
    } catch (error) {
      console.log("error in update review use case", error);
      return {
        success: false,
        message: "error in update review use case",
        err: error,
      };
    }
  };
}
