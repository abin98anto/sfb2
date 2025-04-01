"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeSocket = void 0;
var socket_io_1 = require("socket.io");
var comments_1 = require("../../shared/constants/comments");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var initializeSocket = function (httpServer) {
    var io = new socket_io_1.Server(httpServer, {
        cors: {
            origin: [
                process.env.BASE_URL_FE,
                process.env.BASE_URL_BE,
            ],
            methods: ["GET", "POST"],
            credentials: true,
            allowedHeaders: ["my-custom-header"],
        },
    });
    io.on(comments_1.comments.IO_CONNECTION, function (socket) {
        console.log(comments_1.comments.IO_CLIENT_CONNECT);
        socket.on(comments_1.comments.IO_JOINROOM, function (chatId) {
            socket.join(chatId);
        });
        socket.on("send-message", function (data) {
            io.to(data.senderId)
                .to(data.receiverId)
                .emit(comments_1.comments.IO_RECIEVE_MSG, data);
        });
        socket.on("msg-read", function (data) {
            socket.to(data.senderId).emit("msg-read", data);
        });
        socket.on(comments_1.comments.IO_DISCONNECT, function () {
            console.log(comments_1.comments.IO_CLIENT_DISCONNECT);
        });
    });
    return io;
};
exports.initializeSocket = initializeSocket;
