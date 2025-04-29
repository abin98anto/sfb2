/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICourse } from "../../core/entities/ICourse";
import IParams from "../../core/entities/misc/IParams";
import { CourseInterface } from "../../core/interfaces/CourseInterface";
import { comments } from "../../shared/constants/comments";
import { Course } from "../db/schemas/courseSchema";

export class CourseRepository implements CourseInterface {
  add = async (course: Partial<ICourse>): Promise<ICourse> => {
    const newCourse = new Course(course);
    await newCourse.save();
    return newCourse;
  };

  getById = async (_id: string): Promise<ICourse | null> => {
    return await Course.findById(_id).populate("category").lean<ICourse>();
  };

  update = async (updates: Partial<ICourse>): Promise<ICourse | null> => {
    const existingCourse = await Course.findById(updates._id).exec();
    if (!existingCourse) {
      throw new Error(comments.COURSE_NOT_FOUND);
    }

    const typedCourse = existingCourse.toObject() as ICourse;

    for (const [key, value] of Object.entries(updates)) {
      if (value !== undefined && key !== "_id") {
        if (key === "curriculum") {
          typedCourse.curriculum = value as ICourse["curriculum"];
        } else if (key === "tutors") {
          typedCourse.tutors = value as ICourse["tutors"];
        } else {
          (typedCourse as any)[key] = value;
        }
      }
    }

    await Course.updateOne({ _id: updates._id }, typedCourse);
    return typedCourse;
  };

  getAll = async (): Promise<ICourse[]> => {
    return await Course.find().populate([
      {
        path: "tutors",
        select: "_id name",
      },
      {
        path: "category",
        select: "_id name",
      },
    ]);
  };

  getPaginated = async ({
    skip,
    limit,
    search,
    category,
    sort,
    isActive,
  }: IParams): Promise<ICourse[]> => {
    let query: any = {};

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }
    if (category && category !== "All") {
      query.category = category;
    }
    let sortOrder: any = { createdAt: -1 };
    if (sort === "oldest") {
      sortOrder = { createdAt: 1 };
    }

    if (isActive) {
      query = { ...query, isActive };
    }

    return await Course.find(query)
      .skip(skip)
      .limit(limit)
      .sort(sortOrder)
      .populate([
        {
          path: "tutors",
          select: "_id name",
        },
        {
          path: "category",
          select: "_id name",
        },
      ]);
  };

  getCount = async (
    search: string,
    category?: string,
    isActive?: boolean
  ): Promise<number> => {
    let query: any = {};

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }
    if (category && category !== "All") {
      query.category = category;
    }

    if (isActive) {
      query = { ...query, isActive };
    }

    return await Course.countDocuments(query);
  };
}
