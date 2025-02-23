import { UseCaseResponse } from "../../entities/misc/useCaseResponse";
import SubscriptionInterface from "../../interfaces/SubscriptionInterface";

export default class NewSubscriberUseCase {
  constructor(private subscriptionRepository: SubscriptionInterface) {}

  execute = async (id: string, userId: string): Promise<UseCaseResponse> => {
    try {
      const result = await this.subscriptionRepository.addUser(id, userId);
      return { success: true, data: result };
    } catch (error) {
      console.log("error in new subscriber usecase", error);
      return {
        success: false,
        message: "error in new subscriber usecase",
        err: error,
      };
    }
  };
}
