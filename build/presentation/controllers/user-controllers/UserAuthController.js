"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAuthController = void 0;
var comments_1 = require("../../../shared/constants/comments");
var UserAuthController = /** @class */ (function () {
    function UserAuthController(sendOTPUseCase, verifyOTPUseCase, deleteUserUseCase, loginUserUseCase, refreshTokenUseCase, updateDetailsUseCase, changePasswordUseCase, googleAuthUseCase, forgotPasswordUseCase, setNewPasswordUseCase) {
        var _this = this;
        this.sendOTPUseCase = sendOTPUseCase;
        this.verifyOTPUseCase = verifyOTPUseCase;
        this.deleteUserUseCase = deleteUserUseCase;
        this.loginUserUseCase = loginUserUseCase;
        this.refreshTokenUseCase = refreshTokenUseCase;
        this.updateDetailsUseCase = updateDetailsUseCase;
        this.changePasswordUseCase = changePasswordUseCase;
        this.googleAuthUseCase = googleAuthUseCase;
        this.forgotPasswordUseCase = forgotPasswordUseCase;
        this.setNewPasswordUseCase = setNewPasswordUseCase;
        this.sendOTP = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, name, email, password, role, user, result, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, name = _a.name, email = _a.email, password = _a.password, role = _a.role;
                        user = {
                            name: name,
                            email: email,
                            password: password,
                            role: role,
                        };
                        return [4 /*yield*/, this.sendOTPUseCase.execute(user)];
                    case 1:
                        result = _b.sent();
                        if (result.success) {
                            res.status(201).json(result);
                        }
                        else if (result.message === comments_1.comments.EMAIL_TAKEN) {
                            res.status(409).json(result);
                        }
                        else {
                            res.status(500).json(result);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _b.sent();
                        console.log(comments_1.comments.OTP_FAIL, error_1);
                        res.status(400).json({ success: false, message: comments_1.comments.SERVER_ERR });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.verifyOTP = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, email, otp, result, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body.data, email = _a.email, otp = _a.otp;
                        return [4 /*yield*/, this.verifyOTPUseCase.execute(otp, email)];
                    case 1:
                        result = _b.sent();
                        if (result.success) {
                            res.status(200).json(result);
                        }
                        else {
                            if (result.message === comments_1.comments.OTP_EXPIRED ||
                                result.message === comments_1.comments.OTP_WRONG) {
                                res.status(400).json(result);
                            }
                            else {
                                res.status(500).json(result);
                            }
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _b.sent();
                        console.log(comments_1.comments.VERIFY_OTP_FAIL, error_2);
                        res.status(400).json({ success: false, message: comments_1.comments.SERVER_ERR });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.deleteUser = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var email, result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        email = req.query.email;
                        return [4 /*yield*/, this.deleteUserUseCase.execute(email)];
                    case 1:
                        result = _a.sent();
                        if (result.success) {
                            res.status(200).json(result);
                        }
                        else {
                            if (result.message === comments_1.comments.USER_NOT_FOUND) {
                                res.status(400).json(result);
                            }
                            else {
                                res.status(500).json(result);
                            }
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        console.error(comments_1.comments.USER_DEL_FAIL, error_3);
                        res.status(400).json({ success: false, message: comments_1.comments.SERVER_ERR });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.login = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, email, password, role, result, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body.userData, email = _a.email, password = _a.password, role = _a.role;
                        return [4 /*yield*/, this.loginUserUseCase.execute(email, password, role)];
                    case 1:
                        result = _b.sent();
                        if (result.success) {
                            res
                                .cookie("accessToken", result.data.accessToken, {
                                httpOnly: true,
                                secure: true,
                                sameSite: "strict",
                                maxAge: 24 * 60 * 60 * 1000,
                            })
                                .cookie("refreshToken", result.data.refreshToken, {
                                httpOnly: true,
                                secure: true,
                                sameSite: "strict",
                                maxAge: 7 * 24 * 60 * 60 * 1000,
                            })
                                .status(200)
                                .json({
                                message: comments_1.comments.LOGIN_SUCC,
                                data: result.data.userData,
                            });
                            return [2 /*return*/];
                        }
                        else {
                            res.status(401).json({ message: comments_1.comments.INVALID_CRED });
                            return [2 /*return*/];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _b.sent();
                        console.error(comments_1.comments.LOGIN_C_FAIL, error_4);
                        res.status(400).json({ success: false, message: comments_1.comments.LOGIN_C_FAIL });
                        return [2 /*return*/];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.logout = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    res
                        .clearCookie("accessToken", {
                        httpOnly: true,
                        secure: true,
                        sameSite: "strict",
                    })
                        .clearCookie("refreshToken", {
                        httpOnly: true,
                        secure: true,
                        sameSite: "strict",
                    })
                        .status(200)
                        .json({ message: comments_1.comments.LOGOUT_SUCC });
                    return [2 /*return*/];
                }
                catch (error) {
                    console.log(comments_1.comments.LOGOUT_C_FAIL, error);
                    res.status(400).json({ success: false, message: comments_1.comments.LOGIN_C_FAIL });
                    return [2 /*return*/];
                }
                return [2 /*return*/];
            });
        }); };
        this.refreshAccessToken = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var refreshToken, data, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log("coookkiies", req.cookies);
                        refreshToken = req.cookies["refreshToken"];
                        return [4 /*yield*/, this.refreshTokenUseCase.execute(refreshToken)];
                    case 1:
                        data = (_a.sent()).data;
                        res.cookie("accessToken", data.newAccessToken, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV === "production",
                            sameSite: "strict",
                            maxAge: 15 * 60 * 1000,
                        });
                        console.log("new one ");
                        res.status(200).json(data);
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        res.status(401).json({
                            success: false,
                            message: error_5 instanceof Error ? error_5.message : comments_1.comments.TOKEN_REFRESH_FAIL,
                            err: error_5,
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.update = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var user, body, result, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        user = req.user, body = req.body;
                        return [4 /*yield*/, this.updateDetailsUseCase.execute(user._id, body)];
                    case 1:
                        result = _a.sent();
                        res.status(200).json(result);
                        return [3 /*break*/, 3];
                    case 2:
                        error_6 = _a.sent();
                        res.status(401).json({
                            success: false,
                            message: comments_1.comments.USER_UPDATE_FAIL,
                            err: error_6,
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.changePassword = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, newPassword, currentPassword, data, error_7;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, newPassword = _a.newPassword, currentPassword = _a.currentPassword;
                        return [4 /*yield*/, this.changePasswordUseCase.execute(req.user, {
                                currentPassword: currentPassword,
                                newPassword: newPassword,
                            })];
                    case 1:
                        data = _b.sent();
                        res.status(200).json(data);
                        return [3 /*break*/, 3];
                    case 2:
                        error_7 = _b.sent();
                        res.status(501).json({
                            success: false,
                            message: comments_1.comments.PASS_CHANGE_FAIL,
                            err: error_7,
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.googleSignIn = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var token, response, _a, accessToken, refreshToken, error_8;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        token = req.body.token;
                        if (!token) {
                            res.status(400).json({ error: comments_1.comments.OAUTH_TOKEN_MISSING });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.googleAuthUseCase.execute(token)];
                    case 1:
                        response = _b.sent();
                        _a = response.data, accessToken = _a.accessToken, refreshToken = _a.refreshToken;
                        res
                            .cookie("accessToken", accessToken, {
                            httpOnly: true,
                            secure: true,
                            sameSite: "strict",
                            maxAge: 24 * 60 * 60 * 1000,
                        })
                            .cookie("userRefresh", refreshToken, {
                            httpOnly: true,
                            secure: true,
                            sameSite: "strict",
                            maxAge: 7 * 24 * 60 * 60 * 1000,
                        })
                            .status(200)
                            .json({
                            success: true,
                            message: response.message,
                            data: response.data,
                        });
                        return [2 /*return*/];
                    case 2:
                        error_8 = _b.sent();
                        console.log(comments_1.comments.OAUTH_FAIL, error_8);
                        res.status(401).json({
                            err: error_8,
                            message: comments_1.comments.OAUTH_FAIL,
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.forgotPasswordOTP = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var email, result, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        email = req.body.email;
                        return [4 /*yield*/, this.forgotPasswordUseCase.execute(email)];
                    case 1:
                        result = _a.sent();
                        res.status(200).json(result);
                        return [3 /*break*/, 3];
                    case 2:
                        error_9 = _a.sent();
                        res.status(401).json({
                            success: false,
                            message: comments_1.comments.FORGOT_PASS_FAIL,
                            err: error_9,
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.resetPassword = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, email, otp, password, result, error_10;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, email = _a.email, otp = _a.otp, password = _a.password;
                        return [4 /*yield*/, this.setNewPasswordUseCase.execute(email, otp, password)];
                    case 1:
                        result = _b.sent();
                        res.status(200).json(result);
                        return [3 /*break*/, 3];
                    case 2:
                        error_10 = _b.sent();
                        res.status(401).json({
                            success: false,
                            message: comments_1.comments.RESET_PASS_FAIL,
                            err: error_10,
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    }
    return UserAuthController;
}());
exports.UserAuthController = UserAuthController;
