/* eslint-disable @typescript-eslint/no-unused-expressions */
import { JwtService } from "../../../infrastructure/external-services/JwtService";
import { comments } from "../../../shared/constants/comments";
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

  // input: user data
  // ouput: creates new user using Oauth data.
  async execute(user: IUser): Promise<UseCaseResponse> {
    try {
      (await this.userRepository.findByEmail(user.email!)) ||
        (await this.createUserUseCase.execute(user));

      const userData = await this.userRepository.findByEmail(user.email!);

      const arg: JwtData = {
        _id: userData?._id,
        role: userData?.role as UserRole,
      };
      console.log("in google auth use case", arg);
      const accessToken = this.jwtService.generateAccessToken(arg);
      const refreshToken = this.jwtService.generateRefreshToken(arg);

      return {
        success: true,
        data: { userData, accessToken, refreshToken },
      };
    } catch (error) {
      console.log(comments.OAUTH_UC_FAIL, error);
      return { success: false, message: comments.OAUTH_UC_FAIL, err: error };
    }
  }
}
