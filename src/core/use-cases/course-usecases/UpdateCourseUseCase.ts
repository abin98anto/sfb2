import { comments } from "../../../shared/constants/comments";
import { ICourse } from "../../entities/ICourse";
import { UseCaseResponse } from "../../entities/misc/useCaseResponse";
import { CourseInterface } from "../../interfaces/CourseInterface";

export class UpdateCourseUseCase {
  constructor(private courseRepository: CourseInterface) {}

  execute = async (course: ICourse): Promise<UseCaseResponse> => {
    try {
      const result = await this.courseRepository.update(course);
      return { success: true, data: result };
    } catch (error) {
      console.log(comments.COURSE_UPDATE_FAIL, error);
      return {
        success: false,
        message: comments.COURSE_UPDATE_FAIL,
        err: error,
      };
    }
  };
}
