"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = void 0;
var mongoose_1 = require("mongoose");
var LessonSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    videoUrl: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
    },
    pdfUrls: [
        {
            type: String,
        },
    ],
}, { timestamps: true });
var SectionSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    lessons: [LessonSchema],
    duration: {
        type: Number,
    },
}, { timestamps: true });
var CourseSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
    },
    subtitle: {
        type: String,
        trim: true,
        maxlength: 200,
    },
    category: {
        type: String,
        required: true,
        ref: "Category",
    },
    topic: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        required: true,
    },
    prerequisites: [
        {
            type: String,
            trim: true,
        },
    ],
    thumbnail: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        maxlength: 2000,
    },
    curriculum: [SectionSchema],
    tutors: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    ],
    totalDuration: {
        type: Number,
        default: 0,
    },
    totalLessons: {
        type: Number,
        default: 0,
    },
    enrollmentCount: {
        type: Number,
        default: 0,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
exports.Course = (0, mongoose_1.model)("Course", CourseSchema);
