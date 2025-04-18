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
exports.CategoryController = void 0;
var comments_1 = require("../../../shared/constants/comments");
var CategoryController = /** @class */ (function () {
    function CategoryController(getCategoriesUseCase, createCategoryUseCase, updateCategoryUseCase) {
        var _this = this;
        this.getCategoriesUseCase = getCategoriesUseCase;
        this.createCategoryUseCase = createCategoryUseCase;
        this.updateCategoryUseCase = updateCategoryUseCase;
        this.getAll = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var page, limit, search, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log("first in line");
                        page = parseInt(req.query.page) || 1;
                        limit = parseInt(req.query.limit) || 10;
                        search = req.query.search || "";
                        return [4 /*yield*/, this.getCategoriesUseCase.execute({
                                page: page,
                                limit: limit,
                                search: search,
                            })];
                    case 1:
                        result = _a.sent();
                        res.status(200).json({ success: true, data: result });
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.log(comments_1.comments.CAT_FETCH_FAIL, error_1);
                        res
                            .status(500)
                            .json({ success: false, message: comments_1.comments.CAT_FETCH_FAIL, err: error_1 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.add = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var category, result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        category = req.body;
                        category.name = category.name.trim().toLowerCase();
                        return [4 /*yield*/, this.createCategoryUseCase.execute(category)];
                    case 1:
                        result = _a.sent();
                        result.success
                            ? res.status(201).json(result)
                            : res.status(409).json(result);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.log(comments_1.comments.CAT_ADD_FAIL, error_2);
                        res
                            .status(500)
                            .json({ success: false, message: comments_1.comments.CAT_ADD_FAIL, err: error_2 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.update = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var category, result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        category = req.body;
                        return [4 /*yield*/, this.updateCategoryUseCase.execute(category)];
                    case 1:
                        result = _a.sent();
                        result.success
                            ? res.status(201).json({ success: true, data: result })
                            : res.status(409).json({ success: false, data: result });
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        console.log(comments_1.comments.CAT_UPDATE_FAIL, error_3);
                        res.status(500).json({
                            success: false,
                            message: comments_1.comments.CAT_UPDATE_FAIL,
                            err: error_3,
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.softDelete = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _id, result, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        _id = req.body._id;
                        return [4 /*yield*/, this.updateCategoryUseCase.execute({
                                _id: _id,
                                isDeleted: true,
                            })];
                    case 1:
                        result = _a.sent();
                        res.status(200).json({ success: true, data: result });
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        console.log(comments_1.comments.CAT_DELETE_FAIL, error_4);
                        res.status(500).json({
                            success: false,
                            message: comments_1.comments.CAT_DELETE_FAIL,
                            err: error_4,
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    }
    return CategoryController;
}());
exports.CategoryController = CategoryController;
