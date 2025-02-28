import { UseCaseResponse } from "../../entities/misc/useCaseResponse";
import EnrollmentInterface from "../../interfaces/EnrollmentInterface";

class GetAllUseCase {
  constructor(private enrollmentRepository: EnrollmentInterface) {}
  execute = async (): Promise<UseCaseResponse> => {
    try {
      const data = await this.enrollmentRepository.getAll();
      return { success: true, data };
    } catch (error) {
      console.log("error getting all enrollments", error);
      return {
        success: false,
        message: "error getting all enrollments",
        err: error,
      };
    }
  };
}

export default GetAllUseCase;
