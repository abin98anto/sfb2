import { comments } from "../../../shared/constants/comments";
import { UseCaseResponse } from "../../entities/misc/useCaseResponse";
import EnrollmentInterface from "../../interfaces/EnrollmentInterface";

class UsersCoursesUseCase {
  constructor(private enrollmentRepository: EnrollmentInterface) {}

  execute = async (userId: string): Promise<UseCaseResponse> => {
    try {
      const data = await this.enrollmentRepository.findByUserId(userId);
      return { success: true, data };
    } catch (error) {
      console.log(comments.USERS_COURSE_FETCH_UC_FAIL, error);
      return {
        success: false,
        message: comments.USERS_COURSE_FETCH_UC_FAIL,
        err: error,
      };
    }
  };
}

export default UsersCoursesUseCase;
