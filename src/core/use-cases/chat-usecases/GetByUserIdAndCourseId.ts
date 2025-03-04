import { UseCaseResponse } from "../../entities/misc/useCaseResponse";
import ChatInterface from "../../interfaces/ChatInterface";

class GetByUserIdAndCourseId {
  constructor(private chatRepository: ChatInterface) {}

  execute = async (
    userId: string,
    courseId: string
  ): Promise<UseCaseResponse> => {
    try {
      const data = await this.chatRepository.getChatByCourseAndUser(
        courseId,
        userId
      );
      return { success: true, data };
    } catch (error) {
      console.log("error fetching chat using user id and course id", error);
      return {
        success: false,
        message: "error fetching chat using user id and course id",
        err: error,
      };
    }
  };
}

export default GetByUserIdAndCourseId;
