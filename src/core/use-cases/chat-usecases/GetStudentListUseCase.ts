import { UseCaseResponse } from "../../entities/misc/useCaseResponse";
import ChatInterface from "../../interfaces/ChatInterface";

class GetStudentList {
  constructor(private chatRepository: ChatInterface) {}

  execute = async (tutorId: string): Promise<UseCaseResponse> => {
    try {
      const data = await this.chatRepository.getStudentList(tutorId);
      // console.log("usecase data", data);
      return { success: true, data };
    } catch (error) {
      console.log("error fetching student details", error);
      return {
        success: false,
        message: "error fetching student details",
        err: error,
      };
    }
  };
}

export default GetStudentList;
