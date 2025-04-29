import { comments } from "../../../shared/constants/comments";
import { PaginationParams } from "../../entities/misc/PaginationParams";
import { UseCaseResponse } from "../../entities/misc/useCaseResponse";
import { CourseInterface } from "../../interfaces/CourseInterface";

export class GetAllCoursesUseCase {
  constructor(private courseRepository: CourseInterface) {}

  execute = async (params: PaginationParams = {}): Promise<UseCaseResponse> => {
    try {
      const {
        page = 1,
        limit = 10,
        search = "",
        category = "",
        sort = "all",
        isActive = "",
      } = params;

      const skip = (page - 1) * limit;

      const totalCount = await this.courseRepository.getCount(search, category);
      const courses = await this.courseRepository.getPaginated({
        skip,
        limit,
        search,
        category,
        sort,
        isActive,
      });

      const data = {
        data: courses,
        total: totalCount,
        limit,
        page,
        totalPages: Math.ceil(totalCount / limit),
      };

      return { success: true, data };
    } catch (error) {
      console.log(comments.COURSES_FETCH_FAIL, error);
      return {
        success: false,
        message: comments.COURSES_FETCH_FAIL,
        err: error,
      };
    }
  };
}
