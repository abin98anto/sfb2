console.log("hello world, this is SkillForge 2.0!!!");
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import { corsOptions } from "./config/corsOptions";
import connectDB from "./infrastructure/db/connection";

dotenv.config();
const app = express();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
