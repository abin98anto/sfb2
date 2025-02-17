import { Schema, model } from "mongoose";
import { ICourse, ILesson, ISection } from "../../../core/entities/ICourse";

const LessonSchema = new Schema<ILesson>(
  {
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
      required: true,
    },
    pdfUrls: [
      {
        type: String,
      },
    ],
    order: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const SectionSchema = new Schema<ISection>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    order: {
      type: Number,
      required: true,
    },
    lessons: [LessonSchema],
  },
  { timestamps: true }
);

const CourseSchema = new Schema<ICourse>(
  {
    basicInfo: {
      title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
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
    },
    advanceInfo: {
      thumbnail: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
        minlength: 50,
        maxlength: 2000,
      },
    },
    curriculum: [SectionSchema],
    tutors: [
      {
        type: Schema.Types.ObjectId,
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
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Course = model<ICourse>("Course", CourseSchema);
