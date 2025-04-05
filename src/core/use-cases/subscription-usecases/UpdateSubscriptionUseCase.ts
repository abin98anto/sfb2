import { comments } from "../../../shared/constants/comments";
import ISubscription from "../../entities/ISubscription";
import { UseCaseResponse } from "../../entities/misc/useCaseResponse";
import SubscriptionInterface from "../../interfaces/SubscriptionInterface";

export default class UpdateSubscriptionUseCase {
  constructor(private subscriptionRepository: SubscriptionInterface) {}

  // input: partial subscription
  // output: updated subscription
  execute = async (data: Partial<ISubscription>): Promise<UseCaseResponse> => {
    try {
      if (data.name && data._id) {
        const existingSubscription: ISubscription | null =
          await this.subscriptionRepository.findById(data._id as string);

        if (!existingSubscription) {
          return { success: false, message: comments.SUB_NOT_FOUND };
        }

        if (existingSubscription.name === data.name) {
          const result = await this.subscriptionRepository.update(data);
          return { success: true, data: result };
        }

        const isDuplicate: ISubscription | null =
          await this.subscriptionRepository.findDuplicates(data.name);

        if (isDuplicate && isDuplicate._id !== data._id) {
          return { success: false, message: comments.SUB_EXIST };
        }
      }
      const result = await this.subscriptionRepository.update(data);
      return { success: true, data: result };
    } catch (error) {
      console.log(comments.SUB_UPDATE_UC_FAIL, error);
      return {
        success: false,
        message: comments.SUB_UPDATE_UC_FAIL,
        err: error,
      };
    }
  };
}
