import { UseCaseResponse } from "../../entities/misc/useCaseResponse";
import { NodemailerInterface } from "../../interfaces/misc/NodemailerInterface";
import { UserInterface } from "../../interfaces/UserInterface";

export default class DenyTutorUseCase {
  constructor(
    private userRepository: UserInterface,
    private nodemailerService: NodemailerInterface
  ) {}

  execute = async (id: string, message: string): Promise<UseCaseResponse> => {
    try {
      const user = await this.userRepository.findById(id);
      this.nodemailerService.send(
        user?.email as string,
        "Tutor Job Application Update",
        message
      );
      await this.userRepository.delete(id);
      return { success: true };
    } catch (error) {
      console.log("error when denying tutor in usecase", error);
      return {
        success: false,
        message: "error when denying tutor in usecase",
        err: error,
      };
    }
  };
}
