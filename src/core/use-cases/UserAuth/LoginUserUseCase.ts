import { JwtService } from "../../../infrastructure/external-services/JwtService";
import { comments } from "../../../shared/constants/comments";
import { UserRole } from "../../entities/misc/enums";
import { JwtData } from "../../entities/misc/JwtData";
import { UseCaseResponse } from "../../entities/misc/useCaseResponse";
import { UserInterface } from "../../interfaces/UserInterface";
import bcrypt from "bcryptjs";

export class LoginUserUseCase {
  constructor(
    private userRepository: UserInterface,
    private jwtService: JwtService
  ) {}

  execute = async (
    email: string,
    password: string,
    role: UserRole
  ): Promise<UseCaseResponse> => {
    try {
      const user = await this.userRepository.findByEmail(email);

      // No user scenario & Wrong password scenario.
      if (!user || !(await bcrypt.compare(password, user.password as string))) {
        return { success: false, message: comments.INVALID_CRED };
      }
      // Wrong user in selected login page scenario.
      if (role !== user.role) {
        return { success: false, message: `${role}s are not permitted.` };
      }

      let payload: JwtData = { _id: user._id, role: user.role as UserRole };

      const accessToken = this.jwtService.generateAccessToken(payload);
      const refreshToken = this.jwtService.generateRefreshToken(payload);

      const plainUser = JSON.parse(JSON.stringify(user));
      const { _id, password: pass, ...userData } = plainUser;

      const data = { accessToken, refreshToken, userData };

      return { success: true, message: comments.LOGIN_SUCC, data };
    } catch (error) {
      console.log(comments.LOGIN_UC_ERR, error);
      return { success: false, message: comments.LOGIN_UC_ERR, err: error };
    }
  };
}
