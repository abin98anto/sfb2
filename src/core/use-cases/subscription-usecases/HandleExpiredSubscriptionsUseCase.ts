import SubscriptionInterface from "../../interfaces/SubscriptionInterface";

// src/application/use-cases/RemoveExpiredSubscriptionsUseCase.js
class HandleExpiredSubscriptionsUseCase {
  constructor(private subscriptionRepository: SubscriptionInterface) {}

  async execute() {
    try {
      const currentDate = new Date();
      const subscriptions =
        await this.subscriptionRepository.findActiveSubscriptions();
      let removedCount = 0;

      for (const subscription of subscriptions) {
        // Filter out expired users
        const activeUsers = subscription.users.filter((user) => {
          return !user.endDate || user.endDate > currentDate;
        });

        // If we found users to remove
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
        message: "Expired subscriptions checked successfully",
        removedCount,
      };
    } catch (error) {
      console.error("Error in RemoveExpiredSubscriptionsUseCase:", error);
      return {
        success: false,
        message: "Failed to process expired subscriptions",
        error: error,
      };
    }
  }
}

export default HandleExpiredSubscriptionsUseCase;
