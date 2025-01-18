import { comments } from "../../../shared/constants/comments";
import { UserRole } from "../../entities/misc/enums";
import { UseCaseResponse } from "../../entities/misc/useCaseResponse";
import { UserInterface } from "../../interfaces/UserInterface";

export class VerifyOTPUseCase {
  constructor(private userRepository: UserInterface) {}

  async execute(otp: string, email: string): Promise<UseCaseResponse> {
    try {
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        return { success: false, message: comments.USER_NOT_FOUND };
      }

      if (user.otp !== otp) {
        return { success: false, message: comments.OTP_WRONG };
      }

      if (user.otpExpiry && user.otpExpiry < new Date()) {
        return { success: false, message: comments.OTP_EXPIRED };
      }

      user.role === UserRole.USER
        ? (user.isActive = true)
        : (user.isActive = false);
      user.otp = undefined;
      user.otpExpiry = undefined;
      await this.userRepository.update(user._id!, user);

      return { success: true, message: comments.USER_VERIFIED };
    } catch (error) {
      console.log(comments.VERIFY_OTP_FAIL, error);
      return { success: false, message: comments.VERIFY_OTP_FAIL, err: error };
    }
  }
}
