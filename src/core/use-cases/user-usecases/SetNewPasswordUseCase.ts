import { comments } from "../../../shared/constants/comments";
import hashPassword from "../../../shared/utils/hashPassword";
import { UseCaseResponse } from "../../entities/misc/useCaseResponse";
import { UserInterface } from "../../interfaces/UserInterface";

export class SetNewPasswordUseCase {
  constructor(private userRepository: UserInterface) {}

  // input: user email, otp, new password
  // output: sets new password.
  async execute(
    email: string,
    otp: string,
    password: string
  ): Promise<UseCaseResponse> {
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

      user.password = await hashPassword(password);
      user.otp = null;
      user.otpExpiry = null;
      await this.userRepository.update(user._id!, user);

      return { success: true };
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, message: error.message };
      } else {
        return {
          success: false,
          message: comments.SET_PASS_ERR,
          err: error,
        };
      }
    }
  }
}
