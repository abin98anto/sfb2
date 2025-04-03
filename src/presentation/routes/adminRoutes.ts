import express from "express";
const adminRouter = express.Router();

import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { UserInterface } from "../../core/interfaces/UserInterface";
import { GetUsersUseCase } from "../../core/use-cases/admin-usecases/GetUsersUseCase";
import { AdminController } from "../controllers/admin-controllers/AdminControllers";
import BlockUsersUseCase from "../../core/use-cases/admin-usecases/BlockUsersUseCase";
import ApproveTutorUseCase from "../../core/use-cases/admin-usecases/ApproveTutorUseCase";
import DenyTutorUseCase from "../../core/use-cases/admin-usecases/DenyTutorUseCase";
import { NodemailerInterface } from "../../core/interfaces/misc/NodemailerInterface";
import { NodemailerService } from "../../infrastructure/external-services/NodemailerService";
import { AuthMiddleware } from "../middleware/authMiddleware";
import { GetUserDetailsUseCase } from "../../core/use-cases/user-usecases/GetUserDetailsUseCase";
import { JwtService } from "../../infrastructure/external-services/JwtService";
import { UserRole } from "../../core/entities/misc/enums";

const userRepository: UserInterface = new UserRepository();
const nodemailerService: NodemailerInterface = new NodemailerService();
const jwtService = new JwtService();

const getUsersUseCase = new GetUsersUseCase(userRepository);
const blockUserUseCase = new BlockUsersUseCase(userRepository);
const approveTutorUseCase = new ApproveTutorUseCase(userRepository);
const denyTutorUseCase = new DenyTutorUseCase(
  userRepository,
  nodemailerService
);
const getUserDetailsUseCase = new GetUserDetailsUseCase(userRepository);

const adminController = new AdminController(
  getUsersUseCase,
  blockUserUseCase,
  approveTutorUseCase,
  denyTutorUseCase
);
// const authMiddleware = AuthMiddleware.create(jwtService, getUserDetailsUseCase);
const authenticate = AuthMiddleware.create(jwtService, getUserDetailsUseCase);
const authorize = AuthMiddleware.authorize([UserRole.ADMIN]);

// adminRouter.use(authenticate, authorize);

adminRouter.get(
  "/users/:role",
  authenticate,
  authorize,
  adminController.getUsersBasedOnRole
);
adminRouter.put(
  "/block/:id",
  authenticate,
  authorize,
  adminController.blockUser
);
adminRouter.put(
  "/approve/:id",
  authenticate,
  authorize,
  adminController.approveTutor
);
adminRouter.put(
  "/deny/:id",
  authenticate,
  authorize,
  adminController.denyTutor
);

export default adminRouter;
