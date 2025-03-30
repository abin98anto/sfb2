import IReview from "../../entities/IReview";
import { UseCaseResponse } from "../../entities/misc/useCaseResponse";
import ReviewInterface from "../../interfaces/ReviewInterface";

export default class CreateReviewUseCase {
  constructor(private reviewRepository: ReviewInterface) {}

  execute = async (review: IReview): Promise<UseCaseResponse> => {
    try {
      const data = await this.reviewRepository.add(review);
      return { success: true, data };
    } catch (error) {
      console.log("error in create review use case", error);
      return {
        success: false,
        message: "error in create review use case",
        err: error,
      };
    }
  };
}
