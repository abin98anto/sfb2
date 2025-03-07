import { JwtService } from "../../../infrastructure/external-services/JwtService";
import { IUser } from "../../entities/IUser";
import { UserRole } from "../../entities/misc/enums";
import { JwtData } from "../../entities/misc/JwtData";
import { UseCaseResponse } from "../../entities/misc/useCaseResponse";
import { UserInterface } from "../../interfaces/UserInterface";
import CreateUserUseCase from "./CreateUserUseCase";

export class GoogleAuthUseCase {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private userRepository: UserInterface,
    private jwtService: JwtService
  ) {}

  async execute(user: IUser): Promise<UseCaseResponse> {
    try {
      (await this.userRepository.findByEmail(user.email!)) ||
        (await this.createUserUseCase.execute(user));

      const userData = await this.userRepository.findByEmail(user.email!);

      let arg: JwtData = {
        _id: userData?._id,
        role: userData?.role as UserRole,
      };

      const accessToken = this.jwtService.generateAccessToken(arg);
      const refreshToken = this.jwtService.generateRefreshToken(arg);

      return {
        success: true,
        data: { userData, accessToken, refreshToken },
      };
    } catch (error) {
      console.log("error in google sign in", error);
      return { success: false, message: "error in google sign in", err: error };
    }
  }
}
