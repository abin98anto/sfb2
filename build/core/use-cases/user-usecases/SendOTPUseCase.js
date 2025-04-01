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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendOTPUseCase = void 0;
var comments_1 = require("../../../shared/constants/comments");
var createOTP_1 = require("../../../shared/utils/createOTP");
var hashPassword_1 = __importDefault(require("../../../shared/utils/hashPassword"));
var SendOTPUseCase = /** @class */ (function () {
    function SendOTPUseCase(userRepository, nodemailerService) {
        var _this = this;
        this.userRepository = userRepository;
        this.nodemailerService = nodemailerService;
        this.execute = function (user) { return __awaiter(_this, void 0, void 0, function () {
            var emailTaken, _a, otp, expiresAt, _b, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this.userRepository.findByEmail(user.email)];
                    case 1:
                        emailTaken = _c.sent();
                        if (emailTaken) {
                            return [2 /*return*/, { success: false, message: comments_1.comments.EMAIL_TAKEN }];
                        }
                        _a = (0, createOTP_1.createOTP)(), otp = _a.otp, expiresAt = _a.expiresAt;
                        _b = user;
                        return [4 /*yield*/, (0, hashPassword_1.default)(user.password)];
                    case 2:
                        _b.password = _c.sent();
                        user.otp = otp;
                        user.otpExpiry = expiresAt;
                        console.log("OTP send to ".concat(user.email, " : ").concat(otp));
                        return [4 /*yield*/, this.nodemailerService.send(user.email, comments_1.comments.OTP_SUBJECT, "Verify your email. OTP : ".concat(otp))];
                    case 3:
                        _c.sent();
                        return [4 /*yield*/, this.userRepository.add(user)];
                    case 4:
                        _c.sent();
                        return [2 /*return*/, { success: true, message: comments_1.comments.OTP_SUCC }];
                    case 5:
                        error_1 = _c.sent();
                        console.log(comments_1.comments.OTP_FAIL, error_1);
                        return [2 /*return*/, { success: false, message: comments_1.comments.OTP_FAIL, err: error_1 }];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
    }
    return SendOTPUseCase;
}());
exports.SendOTPUseCase = SendOTPUseCase;
