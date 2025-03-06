import { UseCaseResponse } from "../../entities/misc/useCaseResponse";
import SubscriptionInterface from "../../interfaces/SubscriptionInterface";

class CheckSubscriptionStatusUseCase {
  constructor(private subscriptionRepository: SubscriptionInterface) {}

  execute = async (email: string): Promise<UseCaseResponse> => {
    try {
      const result = await this.subscriptionRepository.checkUserSubscription(
        email
      );
      console.log("chcekc subs status", result);
      return { success: true, data: result };
    } catch (error) {
      console.log("error in check subscription status usecase", error);
      return {
        success: false,
        message: "error in check subscription status usecase",
        err: error,
      };
    }
  };
}

export default CheckSubscriptionStatusUseCase;
