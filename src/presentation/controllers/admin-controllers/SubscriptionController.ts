import ISubscription from "../../../core/entities/ISubscription";
import CreateSubscriptionUseCase from "../../../core/use-cases/subscription-usecases/CreateSubscriptionUseCase";
import NewSubscriberUseCase from "../../../core/use-cases/subscription-usecases/NewSubscriberUseCase";

import { Request, Response } from "express";
import UpdateSubscriptionUseCase from "../../../core/use-cases/subscription-usecases/UpdateSubscriptionUseCase";
import GetAllSubscriptionsUseCase from "../../../core/use-cases/subscription-usecases/GetAllSubscriptionsUseCase";
import HandleExpiredSubscriptionsUseCase from "../../../core/use-cases/subscription-usecases/HandleExpiredSubscriptionsUseCase";

export default class SubscriptionController {
  constructor(
    private createSubscriptionUseCase: CreateSubscriptionUseCase,
    private updateSubscriptionUseCase: UpdateSubscriptionUseCase,
    private getAllSubscriptionsUseCase: GetAllSubscriptionsUseCase,
    private newSubscriberUseCase: NewSubscriberUseCase,
    private handleExpiredSubscriptionsUseCase: HandleExpiredSubscriptionsUseCase
  ) {}

  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = (req.query.search as string) || "";

      const result = await this.getAllSubscriptionsUseCase.execute({
        page,
        limit,
        search,
      });
      res.status(200).json(result);
    } catch (error) {
      console.log("error in get all subscription", error);
      res.status(500).json({ message: "error in get all subscription" });
    }
  };

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const subscription = req.body;
      subscription.name = subscription.name.trim().toLowerCase();
      const result = await this.createSubscriptionUseCase.execute(subscription);
      result.success
        ? res.status(201).json(result)
        : res.status(409).json(result);
    } catch (error) {
      console.log("error in add subscription", error);
      res.status(500).json({ message: "error in add subscription" });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const { body } = req;
      const result = await this.updateSubscriptionUseCase.execute(
        body as Partial<ISubscription>
      );
      result.success
        ? res.status(200).json(result)
        : res.status(409).json(result);
    } catch (error) {
      console.log("error in update subscription", error);
      res.status(500).json({ message: "error in update subscription" });
    }
  };

  addSubscriber = async (req: Request, res: Response): Promise<void> => {
    // try {
    //   const { subscriptionId, userId } = req.body;
    //   const result = await this.newSubscriberUseCase.execute(
    //     subscriptionId,
    //     userId
    //   );
    //   result.success
    //     ? res.status(200).json(result)
    //     : res.status(409).json(result);
    // } catch (error) {
    //   console.log("error in add subscriber", error);
    //   res.status(500).json({ message: "error adding new subscriber" });
    // }
  };

  async removeExpiredSubscriptions(req: Request, res: Response) {
    try {
      const result = await this.handleExpiredSubscriptionsUseCase.execute();

      if (result.success) {
        return res.status(200).json({
          success: true,
          message: `Successfully processed subscriptions. Removed ${result.removedCount} expired users.`,
        });
      } else {
        return res.status(500).json({
          success: false,
          message: result.message,
        });
      }
    } catch (error) {
      console.error("SubscriptionController Error:", error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while processing expired subscriptions",
      });
    }
  }
}
