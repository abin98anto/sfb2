import { comments } from "../../../shared/constants/comments";
import { UseCaseResponse } from "../../entities/misc/useCaseResponse";
import { CourseInterface } from "../../interfaces/CourseInterface";

export class GetCourseDetailsUseCase {
  constructor(private courseRepository: CourseInterface) {}

  execute = async (courseId: string): Promise<UseCaseResponse> => {
    try {
      // console.log("the course id", courseId);
      const result = await this.courseRepository.getById(courseId);
      // console.log("the use case reslt", result);
      return { success: true, data: result };
    } catch (error) {
      console.log(comments.COURSE_FETCH_FAIL, error);
      return {
        success: false,
        message: comments.COURSE_FETCH_FAIL,
        err: error,
      };
    }
  };
}
