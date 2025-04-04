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
exports.AuthMiddleware = void 0;
var comments_1 = require("../../shared/constants/comments");
var AuthMiddleware = /** @class */ (function () {
    function AuthMiddleware() {
    }
    AuthMiddleware.create = function (jwtService, getUserDetailsUseCase) {
        var _this = this;
        return function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var accessToken, decoded, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log("authenticating", req.cookies);
                        accessToken = req.cookies["accessToken"];
                        console.log("access token", accessToken);
                        if (!accessToken) {
                            res.status(401).json({ message: comments_1.comments.ACCSS_NOT_FOUND });
                            return [2 /*return*/];
                        }
                        decoded = jwtService.verifyAccessToken(accessToken);
                        console.log("decoded", decoded);
                        if (!(decoded === null || decoded === void 0 ? void 0 : decoded._id)) {
                            res.status(401).json({ message: comments_1.comments.JWT_PAYLOAD_INVLD });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, getUserDetailsUseCase.execute(decoded === null || decoded === void 0 ? void 0 : decoded._id)];
                    case 1:
                        data = (_a.sent()).data;
                        console.log("the user data ", data);
                        if (!data) {
                            res.status(401).json({ message: comments_1.comments.USER_NOT_FOUND });
                            return [2 /*return*/];
                        }
                        if (!data.isActive) {
                            console.log("user not active ", data.isActive);
                            res.status(401).json({ message: "user is blocked by admin" });
                            return [2 /*return*/];
                        }
                        console.log("user active", data.isActive);
                        req.user = data;
                        console.log("authenticating done");
                        next();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        res.status(401).json({ message: comments_1.comments.ACCESS_INVLD });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    };
    AuthMiddleware.authorize = function (allowedRoles) {
        return function (req, res, next) {
            console.log("authorize");
            if (!req.user) {
                console.log("no user");
                res.status(401).json({ message: comments_1.comments.ACCESS_INVLD });
                return;
            }
            // console.log("the user to authorize", req.user);
            // if (!req.user.isActive) {
            //   console.log("user is blocked by admin");
            //   res.status(401).json({ message: "user is blocked by admin" });
            //   return;
            // }
            var userRole = req.user.role;
            console.log("uesrrole", userRole);
            console.log("alllowed roles", allowedRoles);
            if (!allowedRoles.includes(userRole)) {
                console.log("not allowed");
                res
                    .status(403)
                    .json({ message: "Access forbidden: Insufficient permissions" });
                return;
            }
            console.log("authorizing done");
            next();
        };
    };
    return AuthMiddleware;
}());
exports.AuthMiddleware = AuthMiddleware;
