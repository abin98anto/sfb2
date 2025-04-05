import { comments } from "../../../shared/constants/comments";
import { UseCaseResponse } from "../../entities/misc/useCaseResponse";
import ChatInterface from "../../interfaces/ChatInterface";

class GetStudentList {
  constructor(private chatRepository: ChatInterface) {}

  // input: tutor id.
  // output: list of students assigned to the tutor.
  execute = async (tutorId: string): Promise<UseCaseResponse> => {
    try {
      const data = await this.chatRepository.getStudentList(tutorId);
      return { success: true, data };
    } catch (error) {
      console.log(comments.STUDENT_DETAIL_FETCH_FAIL, error);
      return {
        success: false,
        message: comments.STUDENT_DETAIL_FETCH_FAIL,
        err: error,
      };
    }
  };
}

export default GetStudentList;
