import dotenv from "dotenv";
dotenv.config();

export const comments = {
  GET_COMM: "API is running...",
  SERVER_CONNECTED: `Server running on port ${process.env.MONGO_URI}`,
};
