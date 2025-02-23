import { UseCaseResponse } from "../../entities/misc/useCaseResponse";
import SubscriptionInterface from "../../interfaces/SubscriptionInterface";

export default class UpdateSubscriptionUseCase {
  constructor(private subscriptionRepository: SubscriptionInterface) {}
  execute = async (): Promise<UseCaseResponse> => {
    try {
      const result = await this.subscriptionRepository.getAll();
      return { success: true, data: result };
    } catch (error) {
      console.log("error in get all subscription usecase", error);
      return {
        success: false,
        message: "error in get all subscription usecase",
        err: error,
      };
    }
  };
}
