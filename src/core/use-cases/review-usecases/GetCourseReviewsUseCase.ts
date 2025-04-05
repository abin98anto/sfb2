import { UseCaseResponse } from "../../entities/misc/useCaseResponse";
import ReviewInterface from "../../interfaces/ReviewInterface";

export default class GetCourseReviewsUseCase {
  constructor(private reviewRepository: ReviewInterface) {}

  // input: courseId
  // output: all reviews of the course.
  execute = async (courseId: string): Promise<UseCaseResponse> => {
    try {
      const data = await this.reviewRepository.getAllCourseReviews(courseId);
      return { success: true, data };
    } catch (error) {
      console.log("error in get course reviews use case", error);
      return {
        success: false,
        message: "error in get course reviews use case",
        err: error,
      };
    }
  };
}
