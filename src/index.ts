import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDB from "./infrastructure/db/connection";
import { corsOptions } from "./config/corsOptions";
import { comments } from "./shared/constants/comments";

import userRouter from "./presentation/routes/userRoutes";
import categoryRouter from "./presentation/routes/categoryRoutes";
import courseRouter from "./presentation/routes/courseRouter";
import adminRouter from "./presentation/routes/adminRoutes";
import subscriptionRoutes from "./presentation/routes/subscriptionRoutes";
import orderRouter from "./presentation/routes/orderRoutes";
import enrollmentRoutes from "./presentation/routes/enrollmentRoutes";
import chatRouter from "./presentation/routes/chatRoutes";
import { createServer } from "http";
import { initializeSocket } from "./infrastructure/external-services/SocketService";
import SubscriptionCronJobs from "./shared/utils/SubscriptionCornJobs";
import HandleExpiredSubscriptionsUseCase from "./core/use-cases/subscription-usecases/HandleExpiredSubscriptionsUseCase";
import SubscriptionRepository from "./infrastructure/repositories/SubscriptionRepository";
import reviewRouter from "./presentation/routes/reviewRoutes";

dotenv.config();
const app = express();

const server = createServer(app);
const io = initializeSocket(server);
app.set("io", io);

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.use("/", userRouter);
app.use("/categories", categoryRouter);
app.use("/course", courseRouter);
app.use("/admin", adminRouter);
app.use("/subsciption", subscriptionRoutes);
app.use("/order", orderRouter);
app.use("/enrollment", enrollmentRoutes);
app.use("/chat", chatRouter);
app.use("/review", reviewRouter);

// Corn job.
const subscriptionRepository = new SubscriptionRepository();
const handleExpiredSubscriptionsUseCase = new HandleExpiredSubscriptionsUseCase(
  subscriptionRepository
);
const subscriptionCronJobs = new SubscriptionCronJobs(
  handleExpiredSubscriptionsUseCase
);
subscriptionCronJobs.setupJobs();

const PORT = 3000;
connectDB().then(() =>
  server.listen(PORT, () => {
    console.log(comments.SERVER_SUCC);
  })
);
