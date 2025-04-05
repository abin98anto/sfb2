import { comments } from "../../../shared/constants/comments";
import { UseCaseResponse } from "../../entities/misc/useCaseResponse";
import { UserInterface } from "../../interfaces/UserInterface";

export default class AddMoneyToWalletUseCase {
  constructor(private userRepository: UserInterface) {}

  // inputs: userId, amount output: amount credited to user.
  execute = async (_id: string, amount: number): Promise<UseCaseResponse> => {
    try {
      const result = await this.userRepository.addToWallet(_id, amount);
      return { success: true, data: result };
    } catch (error) {
      console.log(comments.MONEY_ADD_FAIL, error);
      return {
        success: false,
        message: comments.MONEY_ADD_FAIL,
        err: error,
      };
    }
  };
}
