import { comments } from "../../../shared/constants/comments";
import IOrder from "../../entities/IOrder";
import { UseCaseResponse } from "../../entities/misc/useCaseResponse";
import SubscriptionInterface from "../../interfaces/SubscriptionInterface";

export default class NewSubscriberUseCase {
  constructor(private subscriptionRepository: SubscriptionInterface) {}

  // input: order object.
  // output: adds user to subscription
  execute = async (order: IOrder): Promise<UseCaseResponse> => {
    try {
      const result = await this.subscriptionRepository.addUser(order);
      return { success: true, data: result };
    } catch (error) {
      console.log(comments.SUB_ADD_USER_UC_FAIL, error);
      return {
        success: false,
        message: comments.SUB_ADD_USER_UC_FAIL,
        err: error,
      };
    }
  };
}
