import { comments } from "../../../shared/constants/comments";
import ISubscription from "../../entities/ISubscription";
import { UseCaseResponse } from "../../entities/misc/useCaseResponse";
import SubscriptionInterface from "../../interfaces/SubscriptionInterface";

class CreateSubscriptionUseCase {
  constructor(private subscriptionRepository: SubscriptionInterface) {}

  execute = async (data: ISubscription): Promise<UseCaseResponse> => {
    try {
      const isDuplicate = await this.subscriptionRepository.findDuplicates(
        data.name
      );
      if (isDuplicate) {
        return { success: false, message: comments.SUB_EXIST };
      }
      const result = await this.subscriptionRepository.add(data);
      return { success: true, data: result };
    } catch (error) {
      console.log(comments.SUB_CREATE_UC_FAIL, error);
      return {
        success: false,
        message: comments.SUB_CREATE_UC_FAIL,
        err: error,
      };
    }
  };
}

export default CreateSubscriptionUseCase;
