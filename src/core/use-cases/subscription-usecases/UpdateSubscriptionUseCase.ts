import ISubscription from "../../entities/ISubscription";
import { UseCaseResponse } from "../../entities/misc/useCaseResponse";
import SubscriptionInterface from "../../interfaces/SubscriptionInterface";

export default class UpdateSubscriptionUseCase {
  constructor(private subscriptionRepository: SubscriptionInterface) {}

  execute = async (data: Partial<ISubscription>): Promise<UseCaseResponse> => {
    try {
      if (data.name && data._id) {
        const existingSubscription: ISubscription | null =
          await this.subscriptionRepository.findById(data._id as string);

        if (!existingSubscription) {
          return { success: false, message: "Subscription not found" };
        }

        if (existingSubscription.name === data.name) {
          const result = await this.subscriptionRepository.update(data);
          return { success: true, data: result };
        }

        const isDuplicate: ISubscription | null =
          await this.subscriptionRepository.findDuplicates(data.name);

        if (isDuplicate && isDuplicate._id !== data._id) {
          return { success: false, message: "Subscription already exists" };
        }
      }
      const result = await this.subscriptionRepository.update(data);
      return { success: true, data: result };
    } catch (error) {
      console.log("error in update subscription usecase", error);
      return {
        success: false,
        message: "error in update subscription usecase",
        err: error,
      };
    }
  };
}
