"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = void 0;
var API_1 = require("../shared/constants/API");
var comments_1 = require("../shared/constants/comments");
exports.corsOptions = {
    origin: function (origin, callback) {
        if (!origin)
            return callback(null, true);
        var allowedOrigins = [
            API_1.API.FRONT_END,
            "https://sf-frontend-ten.vercel.app/",
        ];
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error(comments_1.comments.CORS_FAIL));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
};
