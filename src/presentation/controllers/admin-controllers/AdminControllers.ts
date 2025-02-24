import { Request, Response } from "express";

import { GetUsersUseCase } from "../../../core/use-cases/admin-usecases/GetUsersUseCase";
import { UpdateDetailsUseCase } from "../../../core/use-cases/user-usecases/UpdateDetailsUseCase";
import { comments } from "../../../shared/constants/comments";

export class AdminController {
  constructor(
    private getUsersUseCase: GetUsersUseCase,
    private updateDetailsUseCase: UpdateDetailsUseCase
  ) {}

  getUsersBasedOnRole = async (req: Request, res: Response) => {
    try {
      const users = await this.getUsersUseCase.execute(
        req.params.role,
        req.query
      );
      res.status(200).json(users);
    } catch (error) {
      console.log(comments.USERS_FETCH_FAIL, error);
      res.status(500).json({ message: comments.USERS_FETCH_FAIL, err: error });
    }
  };

  blockUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const result = await this.updateDetailsUseCase.execute(id, {
        isActive: false,
      });

      res.status(200).json(result);
    } catch (error) {
      console.log("error blocking user", error);
      res.status(500).json({ message: "error blocking user", err: error });
    }
  };
}

export default AdminController;
