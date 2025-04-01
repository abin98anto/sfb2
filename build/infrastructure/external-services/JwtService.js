"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtService = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var comments_1 = require("../../shared/constants/comments");
var ACCESS_SECRET = process.env.JWT_ACCESS;
var ACCESS_EXPIRY = "1d";
var REFRESH_SECRET = process.env.JWT_REFRESH;
var REFRESH_EXPIRY = "7d";
var JwtService = /** @class */ (function () {
    function JwtService() {
        this.generateAccessToken = function (data) {
            return jsonwebtoken_1.default.sign(data, ACCESS_SECRET, { expiresIn: ACCESS_EXPIRY });
        };
        this.generateRefreshToken = function (data) {
            return jsonwebtoken_1.default.sign(data, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRY });
        };
        this.verifyAccessToken = function (token) {
            try {
                return jsonwebtoken_1.default.verify(token, ACCESS_SECRET);
            }
            catch (error) {
                console.error(comments_1.comments.ACCESS_INVLD, error);
                throw new Error(comments_1.comments.ACCESS_INVLD);
            }
        };
        this.verifyRefreshToken = function (token) {
            try {
                return jsonwebtoken_1.default.verify(token, REFRESH_SECRET);
            }
            catch (error) {
                console.error(comments_1.comments.REFRESH_INVLD, error);
                throw new Error(comments_1.comments.REFRESH_INVLD);
            }
        };
    }
    return JwtService;
}());
exports.JwtService = JwtService;
