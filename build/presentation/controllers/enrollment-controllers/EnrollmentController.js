"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var comments_1 = require("../../../shared/constants/comments");
var EnrollmentController = /** @class */ (function () {
    function EnrollmentController(enrollUserUseCase, enrollmentDetailsUseCase, getAllUseCase, updateEnrollmentUseCase, usersCoursesUseCase, getEnrollmentWithoutIdUseCase) {
        var _this = this;
        this.enrollUserUseCase = enrollUserUseCase;
        this.enrollmentDetailsUseCase = enrollmentDetailsUseCase;
        this.getAllUseCase = getAllUseCase;
        this.updateEnrollmentUseCase = updateEnrollmentUseCase;
        this.usersCoursesUseCase = usersCoursesUseCase;
        this.getEnrollmentWithoutIdUseCase = getEnrollmentWithoutIdUseCase;
        this.add = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var enrollment, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        enrollment = req.body;
                        return [4 /*yield*/, this.enrollUserUseCase.execute(__assign(__assign({}, enrollment), { userId: req.user._id }), req.user)];
                    case 1:
                        result = _a.sent();
                        res.status(201).json(result);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.log(comments_1.comments.ENROLL_ADD_FAIL, error_1);
                        res.status(500).json({
                            message: comments_1.comments.ENROLL_ADD_FAIL,
                            err: error_1,
                            success: false,
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getDetails = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id, result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        return [4 /*yield*/, this.enrollmentDetailsUseCase.execute(id)];
                    case 1:
                        result = _a.sent();
                        res.status(200).json(result);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.log(comments_1.comments.ENROLL_DETAILS_FAIL, error_2);
                        res.status(500).json({
                            message: comments_1.comments.ENROLL_DETAILS_FAIL,
                            err: error_2,
                            success: false,
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getAll = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.getAllUseCase.execute()];
                    case 1:
                        result = _a.sent();
                        // console.log("the result", result);
                        res.status(200).json(result);
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        console.log(comments_1.comments.ENROLL_ALL_FAIL, error_3);
                        res.status(500).json({
                            message: comments_1.comments.ENROLL_ALL_FAIL,
                            err: error_3,
                            success: false,
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.update = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var updates, result, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        updates = req.body.updates;
                        return [4 /*yield*/, this.updateEnrollmentUseCase.execute(updates)];
                    case 1:
                        result = _a.sent();
                        res.status(200).json(result);
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        console.log(comments_1.comments.ENROLL_UPDATE_FAIL, error_4);
                        res.status(500).json({
                            message: comments_1.comments.ENROLL_UPDATE_FAIL,
                            err: error_4,
                            success: false,
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getUserCourses = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, result, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userId = req.user._id;
                        return [4 /*yield*/, this.usersCoursesUseCase.execute(userId)];
                    case 1:
                        result = _a.sent();
                        res.status(200).json(result);
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        console.log(comments_1.comments.ENROLL_USER_COURSE_ERR, error_5);
                        res.status(500).json({
                            message: comments_1.comments.ENROLL_USER_COURSE_ERR,
                            err: error_5,
                            success: false,
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getWithoutId = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, courseId, result, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userId = req.user._id;
                        courseId = req.body.courseId;
                        return [4 /*yield*/, this.getEnrollmentWithoutIdUseCase.execute(userId.toString(), courseId)];
                    case 1:
                        result = _a.sent();
                        res.status(200).json(result);
                        return [3 /*break*/, 3];
                    case 2:
                        error_6 = _a.sent();
                        console.log(comments_1.comments.ENROLL_DETAILS2_FAIL, error_6);
                        res.status(500).json({
                            message: comments_1.comments.ENROLL_DETAILS2_FAIL,
                            err: error_6,
                            success: false,
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getEnrollments = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, courseId, userId, result, error_7;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, courseId = _a.courseId, userId = _a.userId;
                        return [4 /*yield*/, this.getEnrollmentWithoutIdUseCase.execute(userId, courseId)];
                    case 1:
                        result = _b.sent();
                        res.status(200).json(result);
                        return [3 /*break*/, 3];
                    case 2:
                        error_7 = _b.sent();
                        console.log(comments_1.comments.ENROLL_DETAILS2_FAIL, error_7);
                        res.status(500).json({
                            message: comments_1.comments.ENROLL_DETAILS2_FAIL,
                            err: error_7,
                            success: false,
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    }
    return EnrollmentController;
}());
exports.default = EnrollmentController;
