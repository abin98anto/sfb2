"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOTP = void 0;
var comments_1 = require("../constants/comments");
var createOTP = function (length) {
    if (length === void 0) { length = 6; }
    try {
        var otp = Math.random().toString().slice(-length);
        var expiresAt = new Date(Date.now() + 60 * 1000);
        return { otp: otp, expiresAt: expiresAt };
    }
    catch (error) {
        console.log(comments_1.comments.OTP_CREATE_FAIL, error);
        return { otp: "", expiresAt: new Date(Date.now()) };
    }
};
exports.createOTP = createOTP;
