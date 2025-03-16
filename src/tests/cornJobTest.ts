import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import SubscriptionModel from "../infrastructure/db/schemas/subscriptionSchema";
import SubscriptionRepository from "../infrastructure/repositories/SubscriptionRepository";
import HandleExpiredSubscriptionsUseCase from "../core/use-cases/subscription-usecases/HandleExpiredSubscriptionsUseCase";
import { comments } from "../shared/constants/comments";

const dbURI = process.env.MONGODB_TEST_URI;
if (!dbURI) {
  throw new Error(comments.NO_MONGO_ID);
}

interface TestSubscription {
  name: string;
  description: string;
  features: {
    hasVideoCall: boolean;
    hasChat: boolean;
    hasCertificate: boolean;
  };
  users: {
    userEmail: string;
    startDate: Date;
    endDate: Date;
  }[];
  isActive: boolean;
  isDeleted: boolean;
}

const testJob = async () => {
  try {
    console.log(comments.MONGO_CONNECTING);
    await mongoose.connect(dbURI, {
      serverSelectionTimeoutMS: 30000,
    });
    console.log(comments.MONGO_CONNECTED);
    await SubscriptionModel.deleteMany({});
    console.log(comments.SUBS_DATA_CLEARED);

    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);

    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 30);

    const testSubscription: TestSubscription = {
      name: "Test Subscription",
      description: "For testing expiration",
      features: {
        hasVideoCall: true,
        hasChat: true,
        hasCertificate: false,
      },
      users: [
        {
          userEmail: "expired@test.com",
          startDate: new Date(pastDate.getTime() - 30 * 24 * 60 * 60 * 1000),
          endDate: pastDate,
        },
        {
          userEmail: "active@test.com",
          startDate: new Date(),
          endDate: futureDate,
        },
      ],
      isActive: true,
      isDeleted: false,
    };

    const createdSubscription = await SubscriptionModel.create(
      testSubscription
    );
    console.log(comments.DUMMY_USERS_CREATED);
    console.log(comments.MANNUAL_TEST_EXPIRED);
    const repository = new SubscriptionRepository();
    const useCase = new HandleExpiredSubscriptionsUseCase(repository);
    const result = await useCase.execute();
    console.log("Use case result:", result);
    if (result.success) {
      console.log(`Removed ${result.removedCount} expired users.`);
    } else {
      console.log(comments.EXPIRED_SUBS_FAIL, result.message);
      return;
    }

    const updatedSubscription = await SubscriptionModel.findById(
      createdSubscription._id
    );
    if (updatedSubscription) {
      console.log(
        `Updated subscription has ${updatedSubscription.users.length} users.`
      );
      console.log(
        comments.REMAINING_USERS,
        updatedSubscription.users[0].userEmail
      );
      if (
        updatedSubscription.users.length === 1 &&
        updatedSubscription.users[0].userEmail === "active@test.com" &&
        result.removedCount === 1
      ) {
        console.log(comments.TEST_COMPLETE);
      } else {
        console.log(comments.TEST_FAILED);
      }
    } else {
      console.log(comments.TEST_FAILED_DEFAULT);
    }

    console.log(comments.TEST_PASSED_DEFAULT);
  } catch (error) {
    console.error(
      comments.TEST_ERR,
      error instanceof Error ? error.message : error
    );
  } finally {
    await mongoose.disconnect();
    console.log(comments.MONGO_DISCONNECTED);
  }
};

testJob();

/*

CornJob test command: npx ts-node ./src/tests/cornJobTest.ts

*/
