import { comments } from "../../../shared/constants/comments";
import { UseCaseResponse } from "../../entities/misc/useCaseResponse";
import { CourseInterface } from "../../interfaces/CourseInterface";

export class GetAllCoursesUseCase {
  constructor(private courseRepository: CourseInterface) {}

  execute = async (): Promise<UseCaseResponse> => {
    try {
      const result = this.courseRepository.getAll();
      return { success: true, data: result };
    } catch (error) {
      console.log(comments.COURSES_FETCH_FAIL, error);
      return {
        success: false,
        message: comments.COURSES_FETCH_FAIL,
        err: error,
      };
    }
  };
}
