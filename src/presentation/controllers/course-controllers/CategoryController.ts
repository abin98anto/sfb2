import { CreateCategoryUseCase } from "../../../core/use-cases/course-usecases/category-usecases/CreateCategoryUseCase";
import { GetCategoriesUseCase } from "../../../core/use-cases/course-usecases/category-usecases/GetCategoriesUseCase";
import { UpdateCategoryUseCase } from "../../../core/use-cases/course-usecases/category-usecases/UpdateCategoryUseCase";

import { Request, Response } from "express";
import { comments } from "../../../shared/constants/comments";

export class CategoryController {
  constructor(
    private getCategoriesUseCase: GetCategoriesUseCase,
    private createCategoryUseCase: CreateCategoryUseCase,
    private updateCategoryUseCase: UpdateCategoryUseCase
  ) {}

  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = (req.query.search as string) || "";

      const result = await this.getCategoriesUseCase.execute({
        page,
        limit,
        search,
      });
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      console.log(comments.CAT_FETCH_FAIL, error);
      res
        .status(500)
        .json({ success: false, message: comments.CAT_FETCH_FAIL, err: error });
    }
  };

  add = async (req: Request, res: Response): Promise<void> => {
    try {
      const category = req.body;
      category.name = category.name.trim().toLowerCase();
      const result = await this.createCategoryUseCase.execute(category);
      result.success
        ? res.status(201).json(result)
        : res.status(409).json(result);
    } catch (error) {
      console.log(comments.CAT_ADD_FAIL, error);
      res
        .status(500)
        .json({ success: false, message: comments.CAT_ADD_FAIL, err: error });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const { body: category } = req;
      const result = await this.updateCategoryUseCase.execute(category);
      result.success
        ? res.status(201).json({ success: true, data: result })
        : res.status(409).json({ success: false, data: result });
    } catch (error) {
      console.log(comments.CAT_UPDATE_FAIL, error);
      res.status(500).json({
        success: false,
        message: comments.CAT_UPDATE_FAIL,
        err: error,
      });
    }
  };

  softDelete = async (req: Request, res: Response): Promise<void> => {
    try {
      const { _id } = req.body;
      const result = await this.updateCategoryUseCase.execute({
        _id,
        isDeleted: true,
      });
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      console.log(comments.CAT_DELETE_FAIL, error);
      res.status(500).json({
        success: false,
        message: comments.CAT_DELETE_FAIL,
        err: error,
      });
    }
  };
}
