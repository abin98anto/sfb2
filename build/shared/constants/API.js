"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.API = void 0;
exports.API = {
    FRONT_END: "https://sff2-second.vercel.app",
    // FRONT_END: "http://sf-frontend-ten.vercel.app/",
    // FRONT_END: "http://localhost:5173",
    // User Auth
    OTP_SENT: "/send-otp",
    OTP_VERIFY: "/verify-otp",
    USER_DELETE: "/delete-user",
    USER_LOGIN: "/login",
    USER_LOGOUT: "/logout",
    // Refresh Access Token
    USER_REFRESH: "/refresh-token",
    // User update
    USER_UPDATE: "/update",
};
