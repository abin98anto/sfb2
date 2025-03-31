import express from "express";
const categoryRouter = express.Router();

import { CategoryController } from "../controllers/course-controllers/CategoryController";
import { GetCategoriesUseCase } from "../../core/use-cases/course-usecases/category-usecases/GetCategoriesUseCase";
import { CreateCategoryUseCase } from "../../core/use-cases/course-usecases/category-usecases/CreateCategoryUseCase";
import { UpdateCategoryUseCase } from "../../core/use-cases/course-usecases/category-usecases/UpdateCategoryUseCase";
import { CategoryInterface } from "../../core/interfaces/CategoryInterface";
import { CategoryRepository } from "../../infrastructure/repositories/CategoryRepository";
import { AuthMiddleware } from "../middleware/authMiddleware";
import { JwtService } from "../../infrastructure/external-services/JwtService";
import { GetUserDetailsUseCase } from "../../core/use-cases/user-usecases/GetUserDetailsUseCase";
import { UserInterface } from "../../core/interfaces/UserInterface";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";

const categoryRepository: CategoryInterface = new CategoryRepository();

const getCategoriesUseCase = new GetCategoriesUseCase(categoryRepository);
const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);
const updateCategoryUseCase = new UpdateCategoryUseCase(categoryRepository);

const categoryController = new CategoryController(
  getCategoriesUseCase,
  createCategoryUseCase,
  updateCategoryUseCase
);
const jwtService = new JwtService();
const userRepository: UserInterface = new UserRepository();
const getUserDetailsUseCase = new GetUserDetailsUseCase(userRepository);
const authMiddleware = AuthMiddleware.create(jwtService, getUserDetailsUseCase);

categoryRouter.get("/", categoryController.getAll);
categoryRouter.post("/add", authMiddleware, categoryController.add);
categoryRouter.put("/update", authMiddleware, categoryController.update);
categoryRouter.delete("/delete", authMiddleware, categoryController.softDelete);

export default categoryRouter;
