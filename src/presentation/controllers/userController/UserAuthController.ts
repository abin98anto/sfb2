import { AddUserUseCase } from "../../../core/use-cases/UserAuthUseCases/AddUserUseCase";
import { GetUserByEmailUseCase } from "../../../core/use-cases/UserAuthUseCases/GetUserByEmailUseCase";
import { GetUserByIdUseCase } from "../../../core/use-cases/UserAuthUseCases/GetUserByIdUseCase";
import { UpdateUserUseCase } from "../../../core/use-cases/UserAuthUseCases/UpdateUserUseCase";

export class UserAuthController {
  constructor(
    private addUserUseCase: AddUserUseCase,
    private getUserByIdUseCase: GetUserByIdUseCase,
    private getUserByEmailUseCase: GetUserByEmailUseCase,
    private updateUserUseCase: UpdateUserUseCase
  ) {}

  
}
