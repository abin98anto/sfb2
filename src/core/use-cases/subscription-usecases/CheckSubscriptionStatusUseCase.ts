import { comments } from "../../../shared/constants/comments";
import { UseCaseResponse } from "../../entities/misc/useCaseResponse";
import SubscriptionInterface from "../../interfaces/SubscriptionInterface";

class CheckSubscriptionStatusUseCase {
  constructor(private subscriptionRepository: SubscriptionInterface) {}

  execute = async (email: string): Promise<UseCaseResponse> => {
    try {
      const result = await this.subscriptionRepository.checkUserSubscription(
        email
      );
      return { success: true, data: result };
    } catch (error) {
      console.log(comments.SUB_STATUS_CHECK_UC_FAIL, error);
      return {
        success: false,
        message: comments.SUB_STATUS_CHECK_UC_FAIL,
        err: error,
      };
    }
  };
}

export default CheckSubscriptionStatusUseCase;
