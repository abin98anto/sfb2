import cron from "node-cron";
import HandleExpiredSubscriptionsUseCase from "../../core/use-cases/subscription-usecases/HandleExpiredSubscriptionsUseCase";
import { comments } from "../constants/comments";

class SubscriptionCronJobs {
  constructor(
    private handleExpiredSubscriptionsUseCase: HandleExpiredSubscriptionsUseCase
  ) {}

  setupJobs() {
    cron.schedule(comments.CORN_TIME, async () => {
      console.log(comments.CORN_STARTED);
      await this.handleExpiredSubscriptionsUseCase.execute();
    });

    console.log(comments.CORN_INITIATED);
  }
}

export default SubscriptionCronJobs;
