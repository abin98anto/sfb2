"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var videocallRouter = (0, express_1.Router)();
var videocallRepository = new VideoCallRepository();
var VideoCallController = new VideoCallController();
videocallRouter.get("/zego-token", zegoController.getZegoToken);
exports.default = videocallRouter;
