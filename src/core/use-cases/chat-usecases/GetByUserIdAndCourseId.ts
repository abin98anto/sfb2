import { comments } from "../../../shared/constants/comments";
import { UseCaseResponse } from "../../entities/misc/useCaseResponse";
import ChatInterface from "../../interfaces/ChatInterface";

class GetByUserIdAndCourseId {
  constructor(private chatRepository: ChatInterface) {}

  // input: user id and course id
  // output: gets a specific course. Used when you don't have chat id.
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
      console.log(comments.CHAT_BY_NOID_UC_FAIL, error);
      return {
        success: false,
        message: comments.CHAT_BY_NOID_UC_FAIL,
        err: error,
      };
    }
  };
}

export default GetByUserIdAndCourseId;
