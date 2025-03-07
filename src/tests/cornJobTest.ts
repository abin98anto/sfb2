// import mongoose from "mongoose";
import SubscriptionModel from "../infrastructure/db/schemas/subscriptionSchema"; // Adjust path as needed
import SubscriptionRepository from "../infrastructure/repositories/SubscriptionRepository"; // Adjust path as needed
import HandleExpiredSubscriptionsUseCase from "../core/use-cases/subscription-usecases/HandleExpiredSubscriptionsUseCase"; // Adjust path as needed
import dotenv from "dotenv";
import mongoose from "mongoose";

// Load environment variables
dotenv.config();
const dbURI = process.env.MONGODB_TEST_URI;

if (!dbURI) {
  throw new Error("MONGODB_URI is not defined in the environment variables.");
}

// Test data interface (adjust based on your ISubscription type)
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
    console.log("Connecting to MongoDB...");
    await mongoose.connect(dbURI, {
      serverSelectionTimeoutMS: 30000,
    });
    console.log("Connected to MongoDB!");

    // Clear existing data to start with a clean slate
    await SubscriptionModel.deleteMany({});
    console.log("Cleared existing subscription data.");

    // Set up test data
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1); // Yesterday

    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 30); // 30 days in future

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
          endDate: pastDate, // Expired
        },
        {
          userEmail: "active@test.com",
          startDate: new Date(),
          endDate: futureDate, // Active
        },
      ],
      isActive: true,
      isDeleted: false,
    };

    // Save test data
    const createdSubscription = await SubscriptionModel.create(
      testSubscription
    );
    console.log("Test subscription created with 2 users.");

    // Run the use case
    console.log("Manually testing expired subscriptions handling...");
    const repository = new SubscriptionRepository(); // Create repository instance
    const useCase = new HandleExpiredSubscriptionsUseCase(repository); // Instantiate use case with repository
    const result = await useCase.execute(); // Execute the use case directly

    // Log the result from the use case
    console.log("Use case result:", result);
    if (result.success) {
      console.log(`Removed ${result.removedCount} expired users.`);
    } else {
      console.log("Failed to process expired subscriptions:", result.message);
      return; // Exit early if the use case failed
    }

    // Verify the database state
    const updatedSubscription = await SubscriptionModel.findById(
      createdSubscription._id
    );
    if (updatedSubscription) {
      console.log(
        `Updated subscription has ${updatedSubscription.users.length} users.`
      );
      console.log(
        "Remaining user email:",
        updatedSubscription.users[0].userEmail
      );
      if (
        updatedSubscription.users.length === 1 &&
        updatedSubscription.users[0].userEmail === "active@test.com" &&
        result.removedCount === 1
      ) {
        console.log("Test passed: Expired user was removed successfully.");
      } else {
        console.log(
          "Test failed: Expired user was not removed or incorrect user remains."
        );
      }
    } else {
      console.log("Test failed: Subscription not found after processing.");
    }

    console.log("Test completed.");
  } catch (error) {
    console.error(
      "Error during test:",
      error instanceof Error ? error.message : error
    );
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
};

testJob();

/*

CornJob test command: npx ts-node ./src/tests/cornJobTest.ts

*/
