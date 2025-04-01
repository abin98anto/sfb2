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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var enrollmentSchema_1 = __importDefault(require("../db/schemas/enrollmentSchema"));
var EnrollmentRepository = /** @class */ (function () {
    function EnrollmentRepository() {
        var _this = this;
        this.add = function (data) { return __awaiter(_this, void 0, void 0, function () {
            var newEnrollment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newEnrollment = new enrollmentSchema_1.default(data);
                        return [4 /*yield*/, newEnrollment.save()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, newEnrollment];
                }
            });
        }); };
        this.findById = function (enrollmentId) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, enrollmentSchema_1.default.findById(enrollmentId)
                            .populate(["courseId", "userId"])
                            .lean()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.findByUserId = function (userId) { return __awaiter(_this, void 0, void 0, function () {
            var enrollments;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, enrollmentSchema_1.default.find({ userId: userId })
                            .populate("courseId")
                            .lean()];
                    case 1:
                        enrollments = _a.sent();
                        if (!enrollments)
                            return [2 /*return*/, null];
                        return [2 /*return*/, enrollments.map(function (doc) { return (__assign(__assign({}, doc), { userId: doc.userId })); })];
                }
            });
        }); };
        this.getAll = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, enrollmentSchema_1.default.find()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.update = function (updates) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, enrollmentSchema_1.default.findByIdAndUpdate(updates._id, { $set: updates }, { new: true })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.getPaginated = function (_a) { return __awaiter(_this, [_a], void 0, function (_b) {
            var query, enrollments;
            var skip = _b.skip, limit = _b.limit, search = _b.search;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        query = search
                            ? { name: { $regex: search, $options: "i" }, isDeleted: false }
                            : { isDeleted: false };
                        return [4 /*yield*/, enrollmentSchema_1.default.find(query)
                                .skip(skip)
                                .limit(limit)
                                .sort({ createdAt: -1 })
                                .lean()];
                    case 1:
                        enrollments = _c.sent();
                        return [2 /*return*/, enrollments.map(function (doc) { return (__assign(__assign({}, doc), { userId: doc.userId, courseId: doc.courseId })); })];
                }
            });
        }); };
        this.getCount = function (search) { return __awaiter(_this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = search
                            ? { name: { $regex: search, $options: "i" }, isDeleted: false }
                            : { isDeleted: false };
                        return [4 /*yield*/, enrollmentSchema_1.default.countDocuments(query)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
    }
    EnrollmentRepository.prototype.findExisting = function (userId, courseId) {
        return enrollmentSchema_1.default.findOne({ userId: userId, courseId: courseId });
    };
    return EnrollmentRepository;
}());
exports.default = EnrollmentRepository;
