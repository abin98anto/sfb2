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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllCoursesUseCase = void 0;
var comments_1 = require("../../../shared/constants/comments");
var GetAllCoursesUseCase = /** @class */ (function () {
    function GetAllCoursesUseCase(courseRepository) {
        var _this = this;
        this.courseRepository = courseRepository;
        this.execute = function () {
            var args_1 = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args_1[_i] = arguments[_i];
            }
            return __awaiter(_this, __spreadArray([], args_1, true), void 0, function (params) {
                var _a, page, _b, limit, _c, search, _d, category, _e, sort, skip, totalCount, courses, data, error_1;
                if (params === void 0) { params = {}; }
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            _f.trys.push([0, 3, , 4]);
                            _a = params.page, page = _a === void 0 ? 1 : _a, _b = params.limit, limit = _b === void 0 ? 10 : _b, _c = params.search, search = _c === void 0 ? "" : _c, _d = params.category, category = _d === void 0 ? "" : _d, _e = params.sort, sort = _e === void 0 ? "all" : _e;
                            skip = (page - 1) * limit;
                            return [4 /*yield*/, this.courseRepository.getCount(search, category)];
                        case 1:
                            totalCount = _f.sent();
                            return [4 /*yield*/, this.courseRepository.getPaginated({
                                    skip: skip,
                                    limit: limit,
                                    search: search,
                                    category: category,
                                    sort: sort,
                                })];
                        case 2:
                            courses = _f.sent();
                            data = {
                                data: courses,
                                total: totalCount,
                                limit: limit,
                                page: page,
                                totalPages: Math.ceil(totalCount / limit),
                            };
                            return [2 /*return*/, { success: true, data: data }];
                        case 3:
                            error_1 = _f.sent();
                            console.log(comments_1.comments.COURSES_FETCH_FAIL, error_1);
                            return [2 /*return*/, {
                                    success: false,
                                    message: comments_1.comments.COURSES_FETCH_FAIL,
                                    err: error_1,
                                }];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
    }
    return GetAllCoursesUseCase;
}());
exports.GetAllCoursesUseCase = GetAllCoursesUseCase;
