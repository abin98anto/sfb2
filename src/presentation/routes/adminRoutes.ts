import express from "express";
const adminRouter = express.Router();

import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { UserInterface } from "../../core/interfaces/UserInterface";
import { GetUsersUseCase } from "../../core/use-cases/admin-usecases/GetUsersUseCase";
import { AdminController } from "../controllers/admin-controllers/AdminControllers";
import { UpdateDetailsUseCase } from "../../core/use-cases/user-usecases/UpdateDetailsUseCase";

const userRepository: UserInterface = new UserRepository();

const getUsersUseCase = new GetUsersUseCase(userRepository);
const updateDetailsUseCase = new UpdateDetailsUseCase(userRepository);

const adminController = new AdminController(
  getUsersUseCase,
  updateDetailsUseCase
);

adminRouter.get("/users/:role", adminController.getUsersBasedOnRole);
adminRouter.put("/block/:id", adminController.blockUser);

export default adminRouter;
