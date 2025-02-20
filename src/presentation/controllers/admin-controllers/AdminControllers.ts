import { GetUsersUseCase } from "../../../core/use-cases/admin-usecases/GetUsersUseCase";
import { comments } from "../../../shared/constants/comments";

export class AdminController {
  constructor(private getUsersUseCase: GetUsersUseCase) {}

  getUsersBasedOnRole = async (req: any, res: any) => {
    try {
      const users = await this.getUsersUseCase.execute(req.params.role);
      return res.status(200).json(users);
    } catch (error) {
      console.log(comments.USERS_FETCH_FAIL, error);
      return res
        .status(500)
        .json({ message: comments.USERS_FETCH_FAIL, err: error });
    }
  };
}
