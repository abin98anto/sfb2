import { comments } from "../../../shared/constants/comments";
import SubscriptionInterface from "../../interfaces/SubscriptionInterface";

class HandleExpiredSubscriptionsUseCase {
  constructor(private subscriptionRepository: SubscriptionInterface) {}

  // input: none
  // output: removes all expired subscriptions
  async execute() {
    try {
      const currentDate = new Date();
      const subscriptions =
        await this.subscriptionRepository.findActiveSubscriptions();
      let removedCount = 0;

      for (const subscription of subscriptions) {
        const activeUsers = subscription.users.filter((user) => {
          return !user.endDate || user.endDate > currentDate;
        });

        if (activeUsers.length !== subscription.users.length) {
          await this.subscriptionRepository.updateSubscriptionUsers(
            subscription._id as string,
            activeUsers
          );

          removedCount += subscription.users.length - activeUsers.length;
        }
      }

      return {
        success: true,
        removedCount,
      };
    } catch (error) {
      console.error(comments.SUB_EXPIRED_REMOVE_UC_FAIL, error);
      return {
        success: false,
        message: comments.SUB_EXPIRED_REMOVE_UC_FAIL,
        error: error,
      };
    }
  }
}

export default HandleExpiredSubscriptionsUseCase;
