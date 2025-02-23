import ISubscription from "../../entities/ISubscription";
import { UseCaseResponse } from "../../entities/misc/useCaseResponse";
import SubscriptionInterface from "../../interfaces/SubscriptionInterface";

export default class CreateSubscriptionUseCase {
  constructor(private subscriptionRepository: SubscriptionInterface) {}

  execute = async (data: ISubscription): Promise<UseCaseResponse> => {
    try {
      const isDuplicate = await this.subscriptionRepository.findDuplicates(
        data.name
      );
      if (isDuplicate) {
        return { success: false, message: "Subscription already exists" };
      }
      const result = await this.subscriptionRepository.add(data);
      return { success: true, data: result };
    } catch (error) {
      console.log("error in create subscription usecase", error);
      return {
        success: false,
        message: "error in create subscription usecase",
        err: error,
      };
    }
  };
}
