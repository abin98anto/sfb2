import IMessage from "../../entities/IMessage";
import { UseCaseResponse } from "../../entities/misc/useCaseResponse";
import { MessageInterface } from "../../interfaces/MessageInterface";

class SendMessageUseCase {
  constructor(private messageRepository: MessageInterface) {}

  execute = async (message: IMessage): Promise<UseCaseResponse> => {
    try {
      const data = await this.messageRepository.createMessage(message);
      return { success: true, data };
    } catch (error) {
      console.log("error creating new message in use case", error);
      return {
        success: false,
        message: "error creating new message in use case",
        err: error,
      };
    }
  };
}

export default SendMessageUseCase;
