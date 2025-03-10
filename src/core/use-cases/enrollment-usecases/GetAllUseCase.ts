import { comments } from "../../../shared/constants/comments";
import { UseCaseResponse } from "../../entities/misc/useCaseResponse";
import EnrollmentInterface from "../../interfaces/EnrollmentInterface";

class GetAllUseCase {
  constructor(private enrollmentRepository: EnrollmentInterface) {}
  execute = async (): Promise<UseCaseResponse> => {
    try {
      const data = await this.enrollmentRepository.getAll();
      return { success: true, data };
    } catch (error) {
      console.log(comments.ENROLL_ALL_FETCH_UC_FAIL, error);
      return {
        success: false,
        message: comments.ENROLL_ALL_FETCH_UC_FAIL,
        err: error,
      };
    }
  };
}

export default GetAllUseCase;
