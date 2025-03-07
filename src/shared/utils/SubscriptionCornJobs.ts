// src/infrastructure/cron/SubscriptionCronJobs.js
import cron from "node-cron";
import HandleExpiredSubscriptionsUseCase from "../../core/use-cases/subscription-usecases/HandleExpiredSubscriptionsUseCase";

class SubscriptionCronJobs {
  constructor(
    private handleExpiredSubscriptionsUseCase: HandleExpiredSubscriptionsUseCase
  ) {}

  setupJobs() {
    // Schedule the job to run daily at midnight
    cron.schedule("0 0 * * *", async () => {
      console.log("Running scheduled task to remove expired subscriptions");
      await this.handleExpiredSubscriptionsUseCase.execute();
    });

    console.log("Subscription cron jobs initialized");
  }
}

export default SubscriptionCronJobs;
