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

dotenv.config();
const app = express();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.use("/", userRouter);
app.use("/categories", categoryRouter);
app.use("/course", courseRouter);
app.use("/admin", adminRouter);
app.use("/subsciption", subscriptionRoutes);
app.use("/order", orderRouter);

const PORT = 4000;
connectDB().then(() =>
  app.listen(PORT, () => {
    console.log(comments.SERVER_SUCC);
  })
);
