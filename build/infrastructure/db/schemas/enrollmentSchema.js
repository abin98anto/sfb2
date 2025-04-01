"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var enums_1 = require("../../../core/entities/misc/enums");
var EnrollmentSchema = new mongoose_1.default.Schema({
    userId: { type: String, ref: "User" },
    courseId: { type: String, ref: "Course" },
    enrolledAt: { type: Date, default: Date.now },
    status: { type: String, default: enums_1.EnrollStatus.PENDING },
    completedLessons: { type: [String], default: [] },
    completedAt: { type: Date },
    quitAt: Date,
}, {
    timestamps: true,
});
var EnrollmentModel = mongoose_1.default.model("Enrollment", EnrollmentSchema);
exports.default = EnrollmentModel;
