import express from "express";
const adminRouter = express.Router();

import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { UserInterface } from "../../core/interfaces/UserInterface";
import { GetUsersUseCase } from "../../core/use-cases/admin-usecases/GetUsersUseCase";
import { AdminController } from "../controllers/admin-controllers/AdminControllers";

const userRepository: UserInterface = new UserRepository();

const getUsersUseCase = new GetUsersUseCase(userRepository);

const adminController = new AdminController(getUsersUseCase);

adminRouter.get("/users/:role", adminController.getUsersBasedOnRole);