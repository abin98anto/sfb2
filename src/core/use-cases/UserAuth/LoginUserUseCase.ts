import { JwtService } from "../../../infrastructure/external-services/JwtService";
import { comments } from "../../../shared/constants/comments";
import { UserRole } from "../../entities/misc/enums";
import { JwtData } from "../../entities/misc/JwtData";
import { UseCaseResponse } from "../../entities/misc/useCaseResponse";
import { UserInterface } from "../../interfaces/UserInterface";
import bcrypt from "bcryptjs";
import { UpdateDetailsUseCase } from "./UpdateDetailsUseCase";

export class LoginUserUseCase {
  constructor(
    private userRepository: UserInterface,
    private jwtService: JwtService,
    private updateDetailsUseCase: UpdateDetailsUseCase
  ) {}

  execute = async (
    email: string,
    password: string,
    role: UserRole
  ): Promise<UseCaseResponse> => {
    try {
      const user = await this.userRepository.findByEmail(email);
      //   console.log("first", user);
      //   console.log("second", role);

      // No user scenario & Wrong password scenario.
      if (!user || !(await bcrypt.compare(password, user.password as string))) {
        console.log("pass not correct....");
        // throw new Error(comments.INVALID_CRED);
        return { success: false, message: comments.INVALID_CRED };
      }

      // Wrong user in selected login page scenario.
      if (role !== user.role) {
        // throw new Error(`${role}s are not permitted.`);
        return { success: false, message: `${role}s are not permitted.` };
      }

      let payload: JwtData = { _id: user._id, role: user.role as UserRole };

      const accessToken = this.jwtService.generateAccessToken(payload);
      const refreshToken = this.jwtService.generateRefreshToken(payload);

      await this.updateDetailsUseCase.execute(user._id as string, {
        refreshToken,
      });

      const plainUser = JSON.parse(JSON.stringify(user));
      const { _id, password: pass, refreshToken: rT, ...userData } = plainUser;

      const data = { accessToken, userData };

      return { success: true, message: comments.LOGIN_SUCC, data };
    } catch (error) {
      console.log(comments.LOGIN_UC_ERR, error);
      return { success: false, message: comments.LOGIN_UC_ERR, err: error };
    }
  };
}
