import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDB from "./infrastructure/db/connection";
import { corsOptions } from "./config/corsOptions";
import { comments } from "./shared/constants/comments";

import userRouter from "./presentation/routes/userRoutes";

dotenv.config();
const app = express();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send(comments.GET_COMM);
});

app.use("/", userRouter);

const PORT = 4000;
connectDB().then(() =>
  app.listen(PORT, () => {
    console.log(comments.SERVER_SUCC);
  })
);
