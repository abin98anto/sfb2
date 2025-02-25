import { Request, Response } from "express";

import { GetUsersUseCase } from "../../../core/use-cases/admin-usecases/GetUsersUseCase";
import { comments } from "../../../shared/constants/comments";
import { IUser } from "../../../core/entities/IUser";
import BlockUsersUseCase from "../../../core/use-cases/admin-usecases/BlockUsersUseCase";
import ApproveTutorUseCase from "../../../core/use-cases/admin-usecases/ApproveTutorUseCase";
import DenyTutorUseCase from "../../../core/use-cases/admin-usecases/DenyTutorUseCase";

export class AdminController {
  constructor(
    private getUsersUseCase: GetUsersUseCase,
    private blockUsersUseCase: BlockUsersUseCase,
    private approveTutorUseCase: ApproveTutorUseCase,
    private denyTutorUserCase: DenyTutorUseCase
  ) {}

  getUsersBasedOnRole = async (req: Request, res: Response) => {
    try {
      const users = await this.getUsersUseCase.execute(
        req.params.role,
        req.query
      );

      let filteredUsers = users.data.data;

      if (req.query?.isVerified && req.params.role === "tutor") {
        const isVerifiedValue = req.query.isVerified === "true";

        filteredUsers = users.data.data.filter(
          (user: IUser) => user.isVerified === isVerifiedValue
        );
      }

      res.status(200).json(filteredUsers);
    } catch (error) {
      console.log(comments.USERS_FETCH_FAIL, error);
      res.status(500).json({ message: comments.USERS_FETCH_FAIL, err: error });
    }
  };

  blockUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const result = await this.blockUsersUseCase.execute(id);

      res.status(200).json(result);
    } catch (error) {
      console.log("error blocking user", error);
      res.status(500).json({ message: "error blocking user", err: error });
    }
  };

  approveTutor = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const result = await this.approveTutorUseCase.execute(id);
      res.status(200).json(result);
    } catch (error) {
      console.log("error blocking user", error);
      res
        .status(500)
        .json({ success: false, message: "error blocking user", err: error });
    }
  };

  denyTutor = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { message } = req.body;
      const result = await this.denyTutorUserCase.execute(id, message);
      res.status(200).json(result);
    } catch (error) {
      console.log("error blocking user", error);
      res
        .status(500)
        .json({ success: false, message: "error blocking user", err: error });
    }
  };
}

export default AdminController;
