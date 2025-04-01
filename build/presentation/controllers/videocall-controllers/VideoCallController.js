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
var VideoCallController = /** @class */ (function () {
    function VideoCallController(generateZegoTokenUseCase, createVideoCallUseCase) {
        var _this = this;
        this.generateZegoTokenUseCase = generateZegoTokenUseCase;
        this.createVideoCallUseCase = createVideoCallUseCase;
        this.getZegoToken = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, tokenResponse, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userId = req.query.userId;
                        if (!userId) {
                            res.status(400).json({ error: "User ID is required" });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.generateZegoTokenUseCase.execute(userId)];
                    case 1:
                        tokenResponse = _a.sent();
                        res.json(tokenResponse);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        res.status(500).json({
                            error: "Failed to generate Zego token",
                            details: error_1,
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.createVideoCall = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, tutorId, studentId, courseId, videoCall, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, tutorId = _a.tutorId, studentId = _a.studentId, courseId = _a.courseId;
                        return [4 /*yield*/, this.createVideoCallUseCase.execute({
                                roomId: "room_".concat(Date.now()), // Generate unique room ID
                                tutorId: tutorId,
                                studentId: studentId,
                                courseId: courseId,
                                startTime: new Date(),
                                status: "scheduled",
                            })];
                    case 1:
                        videoCall = _b.sent();
                        res.status(201).json({
                            success: true,
                            data: videoCall,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _b.sent();
                        res.status(500).json({
                            success: false,
                            message: "Failed to create video call",
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    }
    return VideoCallController;
}());
exports.default = VideoCallController;
