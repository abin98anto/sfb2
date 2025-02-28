import { UseCaseResponse } from "../../entities/misc/useCaseResponse";
import EnrollmentInterface from "../../interfaces/EnrollmentInterface";

class EnrollmentDetailsUseCase {
  constructor(private enrollmentRepository: EnrollmentInterface) {}

  execute = async (enrollmentId: string): Promise<UseCaseResponse> => {
    try {
      const data = await this.enrollmentRepository.findById(enrollmentId);
      return { success: true, data };
    } catch (error) {
      console.log("error getting enrollment details", error);
      return {
        success: false,
        message: "error getting enrollment details",
        err: error,
      };
    }
  };
}

export default EnrollmentDetailsUseCase;
