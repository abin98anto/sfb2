import { UseCaseResponse } from "../../entities/misc/useCaseResponse";
import EnrollmentInterface from "../../interfaces/EnrollmentInterface";

class UsersCoursesUseCase {
  constructor(private enrollmentRepository: EnrollmentInterface) {}

  execute = async (userId: string): Promise<UseCaseResponse> => {
    try {
      const data = await this.enrollmentRepository.findByUserId(userId);
      return { success: true, data };
    } catch (error) {
      console.log("error getting user's courses", error);
      return {
        success: false,
        message: "error getting user's courses",
        err: error,
      };
    }
  };
}

export default UsersCoursesUseCase;
