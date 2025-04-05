import { comments } from "../../../shared/constants/comments";
import { createOTP } from "../../../shared/utils/createOTP";
import { UseCaseResponse } from "../../entities/misc/useCaseResponse";
import { NodemailerInterface } from "../../interfaces/misc/NodemailerInterface";
import { UserInterface } from "../../interfaces/UserInterface";

class ForgotPasswordUseCase {
  constructor(
    private userRepository: UserInterface,
    private nodemailerService: NodemailerInterface
  ) {}

  // input: user email
  // output: sends otp to change password.
  async execute(email: string): Promise<UseCaseResponse> {
    try {
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        return { success: false, message: comments.USER_NOT_FOUND };
      }

      const { otp, expiresAt: expiration } = createOTP();
      user.otp = otp;
      user.otpExpiry = expiration;
      console.log(comments.FORGOT_PASS_OTP, otp);

      const subject = comments.FORGOT_PASS_SUBJECT;
      const text = "Forgot password OTP : " + otp;
      await this.nodemailerService.send(user.email as string, subject, text);
      await this.userRepository.update(user._id as string, user);

      return { success: true };
    } catch (error) {
      console.log(comments.FORGOT_PASS_UC_FAIL, error);
      if (error instanceof Error) {
        return { success: false, message: error.message };
      } else {
        return { success: false };
      }
    }
  }
}

export default ForgotPasswordUseCase;
