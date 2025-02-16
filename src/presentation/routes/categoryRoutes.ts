import express from "express";
const categoryRouter = express.Router();

import { CategoryController } from "../controllers/course-controllers/CategoryController";
import { GetCategoriesUseCase } from "../../core/use-cases/course-usecases/category-usecases/GetCategoriesUseCase";
import { CreateCategoryUseCase } from "../../core/use-cases/course-usecases/category-usecases/CreateCategoryUseCase";
import { UpdateCategoryUseCase } from "../../core/use-cases/course-usecases/category-usecases/UpdateCategoryUseCase";
import { RemoveCategoryUseCase } from "../../core/use-cases/course-usecases/category-usecases/RemoveCategoryUseCase";
import { CategoryInterface } from "../../core/interfaces/CategoryInterface";
import { CategoryRepository } from "../../infrastructure/repositories/CategoryRepository";

const categoryRepository: CategoryInterface = new CategoryRepository();

const getCategoriesUseCase = new GetCategoriesUseCase(categoryRepository);
const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);
const updateCategoryUseCase = new UpdateCategoryUseCase(categoryRepository);
const removeCategoryUseCase = new RemoveCategoryUseCase(categoryRepository);

const categoryController = new CategoryController(
  getCategoriesUseCase,
  createCategoryUseCase,
  updateCategoryUseCase,
  removeCategoryUseCase
);

categoryRouter.get("/", categoryController.getAll);
categoryRouter.post("/add", categoryController.add);
categoryRouter.put("/update", categoryController.update);
categoryRouter.delete("/delete", categoryController.delete);

export default categoryRouter;
