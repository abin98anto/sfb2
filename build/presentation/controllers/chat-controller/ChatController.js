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
var comments_1 = require("../../../shared/constants/comments");
var ChatController = /** @class */ (function () {
    function ChatController(createChatUseCase, sendMessageUseCase, GetAllChatsUseCase, findChatUseCase, getByUserIdAndCourseIdUseCase, markAsReadUseCase, getStudentList, unreadCountUseCase, lastMessageUseCase, unreadCountByChatUseCase, clearUnreadMessageCountUseCase) {
        var _this = this;
        this.createChatUseCase = createChatUseCase;
        this.sendMessageUseCase = sendMessageUseCase;
        this.GetAllChatsUseCase = GetAllChatsUseCase;
        this.findChatUseCase = findChatUseCase;
        this.getByUserIdAndCourseIdUseCase = getByUserIdAndCourseIdUseCase;
        this.markAsReadUseCase = markAsReadUseCase;
        this.getStudentList = getStudentList;
        this.unreadCountUseCase = unreadCountUseCase;
        this.lastMessageUseCase = lastMessageUseCase;
        this.unreadCountByChatUseCase = unreadCountByChatUseCase;
        this.clearUnreadMessageCountUseCase = clearUnreadMessageCountUseCase;
        this.createChat = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var chat, newChat, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        chat = req.body;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.createChatUseCase.execute(chat)];
                    case 2:
                        newChat = _a.sent();
                        res.status(201).json(newChat);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.log(comments_1.comments.CHAT_ADD_C_ERR, error_1);
                        res.status(500).json({ message: comments_1.comments.CHAT_ADD_C_ERR, err: error_1 });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.sendMessage = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var message, result, savedMessage, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        message = req.body;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.sendMessageUseCase.execute(message)];
                    case 2:
                        result = _a.sent();
                        if (!result.success || !result.data) {
                            throw new Error("Failed to save message");
                        }
                        savedMessage = result.data;
                        // const io = req.app.get("io");
                        // io.to(savedMessage.chatId).emit(comments.IO_RECIEVE_MSG, savedMessage);
                        // console.log("sending notification ", message);
                        // io.to(savedMessage.receiverId).emit(
                        //   comments.IO_MSG_NOTIFICATION,
                        //   savedMessage
                        // );
                        res.status(200).json({ success: true, data: savedMessage });
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        console.log(comments_1.comments.MSG_SENT_FAIL, error_2);
                        res.status(500).json({ message: comments_1.comments.MSG_SENT_FAIL });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.getMessages = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var chatId, messages, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        chatId = req.params.chatId;
                        return [4 /*yield*/, this.findChatUseCase.execute(chatId)];
                    case 1:
                        messages = _a.sent();
                        res.status(200).json(messages);
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        console.log(comments_1.comments.MSG_FETCH_C_ERR, error_3);
                        res.status(500).json({ message: comments_1.comments.MSG_FETCH_C_ERR });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getByUserIdAndCourseId = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, courseId, userId, result, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, courseId = _a.courseId, userId = _a.userId;
                        return [4 /*yield*/, this.getByUserIdAndCourseIdUseCase.execute(courseId, userId)];
                    case 1:
                        result = _b.sent();
                        res.status(200).json(result);
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _b.sent();
                        console.log(comments_1.comments.MSG_FETCH2_C_ERR, error_4);
                        res.status(500).json({ message: comments_1.comments.MSG_FETCH2_C_ERR });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getChatList = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, result, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userId = req.query.userId;
                        return [4 /*yield*/, this.GetAllChatsUseCase.execute(userId)];
                    case 1:
                        result = _a.sent();
                        res.status(200).json(result);
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        console.log(comments_1.comments.CHAT_LIST_FETCH_FAIL, error_5);
                        res.status(500).json({ message: comments_1.comments.CHAT_LIST_FETCH_FAIL });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.markAsRead = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var messageIds, result, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        messageIds = req.body.messageIds;
                        return [4 /*yield*/, this.markAsReadUseCase.execute(messageIds)];
                    case 1:
                        result = _a.sent();
                        res.status(200).json(result);
                        return [3 /*break*/, 3];
                    case 2:
                        error_6 = _a.sent();
                        console.log(comments_1.comments.MSG_READ_ERR, error_6);
                        res.status(500).json({ message: comments_1.comments.MSG_READ_ERR });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.videoCallInvitation = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, roomID, userId, studentId, io;
            return __generator(this, function (_b) {
                try {
                    _a = req.body, roomID = _a.roomID, userId = _a.userId, studentId = _a.studentId;
                    io = req.app.get("io");
                    io.emit(comments_1.comments.IO_CALL_INVITE, { roomID: roomID, userId: userId, studentId: studentId });
                    res.status(200).json({ message: comments_1.comments.CALL_INVITE_SENT });
                }
                catch (error) {
                    console.log(comments_1.comments.CALL_INVITE_FAIL, error);
                    res.status(500).json({ message: comments_1.comments.CALL_INVITE_FAIL });
                }
                return [2 /*return*/];
            });
        }); };
        this.studentList = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var tutorId, result, error_7;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        tutorId = (_a = req.user._id) === null || _a === void 0 ? void 0 : _a.toString();
                        return [4 /*yield*/, this.getStudentList.execute(tutorId)];
                    case 1:
                        result = _b.sent();
                        res.status(200).json(result);
                        return [3 /*break*/, 3];
                    case 2:
                        error_7 = _b.sent();
                        console.log(comments_1.comments.STUDENT_LIST_FETCH_FAIL, error_7);
                        res.status(500).json({ message: comments_1.comments.STUDENT_LIST_FETCH_FAIL });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getUnreadMessageCount = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, unreadCount, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userId = req.params.userId;
                        return [4 /*yield*/, this.unreadCountUseCase.execute(userId)];
                    case 1:
                        unreadCount = _a.sent();
                        res.status(200).json({
                            success: true,
                            data: { unreadCount: unreadCount },
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_8 = _a.sent();
                        console.error("Failed to get unread message count:", error_8);
                        res.status(500).json({
                            success: false,
                            message: "Failed to get unread message count",
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getLastMessages = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, lastMessages, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userId = req.body.userId;
                        return [4 /*yield*/, this.lastMessageUseCase.execute(userId)];
                    case 1:
                        lastMessages = _a.sent();
                        res.status(200).json({
                            success: true,
                            data: { lastMessages: lastMessages },
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_9 = _a.sent();
                        console.error("Failed to get last messages:", error_9);
                        res.status(500).json({
                            success: false,
                            message: "Failed to get last messages",
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getUnreadCountByChatId = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, chatId, userId, unreadCount, error_10;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, chatId = _a.chatId, userId = _a.userId;
                        return [4 /*yield*/, this.unreadCountByChatUseCase.execute(chatId, userId)];
                    case 1:
                        unreadCount = _b.sent();
                        res.status(200).json({
                            success: true,
                            data: { unreadCount: unreadCount },
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_10 = _b.sent();
                        console.error("Failed to get unread message count:", error_10);
                        res.status(500).json({
                            success: false,
                            message: "Failed to get unread message count",
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.clearUnreadCount = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var chatId, data, error_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        chatId = req.body.chatId;
                        return [4 /*yield*/, this.clearUnreadMessageCountUseCase.execute(chatId)];
                    case 1:
                        data = _a.sent();
                        res.status(200).json({
                            success: true,
                            data: data,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_11 = _a.sent();
                        console.error("Failed to clear unread message count:", error_11);
                        res.status(500).json({
                            success: false,
                            message: "Failed to clear unread message count",
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    }
    return ChatController;
}());
exports.default = ChatController;
