"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
var mongoose_1 = __importStar(require("mongoose"));
var enums_1 = require("../../../core/entities/misc/enums");
var comments_1 = require("../../../shared/constants/comments");
var userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: {
        type: String,
        required: true,
        default: enums_1.UserRole.USER,
    },
    password: { type: String, default: null },
    picture: { type: String, default: "" },
    wallet: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    otp: { type: String, default: comments_1.comments.OTP_DFLT },
    otpExpiry: { type: Date, default: Date.now },
    resume: { type: String, default: "" },
    students: [String],
    reviewsTaken: { type: Number, default: 0 },
    sessionsTaken: { type: Number, default: 0 },
    isVerified: { type: Boolean, default: false },
    refreshToken: { type: String, default: null },
}, {
    timestamps: true,
});
exports.UserModel = mongoose_1.default.model("User", userSchema);
