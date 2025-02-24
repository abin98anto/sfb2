import { comments } from "../../../shared/constants/comments";
import IParams from "../../entities/misc/IParams";
import { PaginationParams } from "../../entities/misc/PaginationParams";
import { UseCaseResponse } from "../../entities/misc/useCaseResponse";
import { UserInterface } from "../../interfaces/UserInterface";

export class GetUsersUseCase {
  constructor(private userRepository: UserInterface) {}

  execute = async (
    role: string,
    params: PaginationParams
  ): Promise<UseCaseResponse> => {
    try {
      const { page = 1, limit = 10, search = "" } = params;
      const skip = (page - 1) * limit;

      const totalCount = await this.userRepository.getCount(role, search);
      const categories = await this.userRepository.getPaginated(role, {
        skip,
        limit,
        search,
      });

      const data = {
        role: role,
        data: categories,
        total: totalCount,
        limit,
        page,
        totalPages: Math.ceil(totalCount / limit),
      };

      return { success: true, data };
    } catch (error) {
      console.log(comments.USERS_FETCH_FAIL, error);
      return { success: false, message: comments.USERS_FETCH_FAIL, err: error };
    }
  };
}
