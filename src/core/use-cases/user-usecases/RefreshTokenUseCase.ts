import { JwtService } from "../../../infrastructure/external-services/JwtService";
import { UserRepository } from "../../../infrastructure/repositories/UserRepository";
import { comments } from "../../../shared/constants/comments";
import { UserRole } from "../../entities/misc/enums";
import { JwtData } from "../../entities/misc/JwtData";
import { UseCaseResponse } from "../../entities/misc/useCaseResponse";

export class RefreshTokenUseCase {
  constructor(
    private jwtService: JwtService,
    private userRepository: UserRepository
  ) {}

  // input: refresh token.
  // output: returns new access token
  execute = async (refreshToken: string): Promise<UseCaseResponse> => {
    try {
      if (!refreshToken) {
        return { success: false, message: comments.RFTKN_NOT_FOUND };
      }

      const decoded = this.jwtService.verifyRefreshToken(refreshToken);
      if (!decoded?._id) {
        return { success: false, message: comments.RFTKN_INVLD };
      }

      const user = await this.userRepository.findById(decoded._id);
      if (!user) {
        return { success: false, message: comments.USER_NOT_FOUND };
      }

      const payload: JwtData = { _id: user._id, role: user.role as UserRole };

      const newAccessToken = this.jwtService.generateAccessToken(payload);

      return {
        success: true,
        message: comments.RFTKN_SUCC,
        data: newAccessToken,
      };
    } catch (error) {
      return { success: false, message: comments.RFTKN_FAIL, err: error };
    }
  };
}
