import IOrder from "../../entities/IOrder";
import { UseCaseResponse } from "../../entities/misc/useCaseResponse";
import SubscriptionInterface from "../../interfaces/SubscriptionInterface";

export default class NewSubscriberUseCase {
  constructor(private subscriptionRepository: SubscriptionInterface) {}

  execute = async (order: IOrder): Promise<UseCaseResponse> => {
    try {
      const result = await this.subscriptionRepository.addUser(order);
      console.log("the use case result ", result);
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
