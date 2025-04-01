import { API } from "../shared/constants/API";
import { comments } from "../shared/constants/comments";

export const corsOptions = {
  origin: function (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) {
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      API.FRONT_END,
      "https://sf-frontend-ten.vercel.app/",
    ];
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(comments.CORS_FAIL));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
};
