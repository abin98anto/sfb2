import { UseCaseResponse } from "../../entities/misc/useCaseResponse";
import { UserInterface } from "../../interfaces/UserInterface";

export default class AddMoneyToWalletUseCase {
  constructor(private userRepository: UserInterface) {}

  execute = async (_id: string, amount: number): Promise<UseCaseResponse> => {
    try {
      const result = await this.userRepository.addToWallet(_id, amount);
      return { success: true, data: result };
    } catch (error) {
      console.log("adding money to wallet failed", error);
      return {
        success: false,
        message: "adding money to wallet failed",
        err: error,
      };
    }
  };
}
