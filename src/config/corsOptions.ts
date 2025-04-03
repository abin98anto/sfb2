import { API } from "../shared/constants/API";
import { comments } from "../shared/constants/comments";

export const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
};
