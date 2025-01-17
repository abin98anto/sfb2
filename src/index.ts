console.log("hello world, this is SkillForge 2.0!!!");
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import { corsOptions } from "./config/corsOptions";
import connectDB from "./infrastructure/db/connection";
import { comments } from "./shared/constants/comments";

dotenv.config();
const app = express();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send(comments.GET_COMM);
});

const PORT = 4000;

connectDB().then(() =>
  app.listen(PORT, () => {
    console.log(comments.SERVER_CONNECTED);
  })
);
