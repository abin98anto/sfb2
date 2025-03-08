import { createOTP } from "../../../shared/utils/createOTP";
import { UseCaseResponse } from "../../entities/misc/useCaseResponse";
import { NodemailerInterface } from "../../interfaces/misc/NodemailerInterface";
import { UserInterface } from "../../interfaces/UserInterface";

class ForgotPasswordUseCase {
  constructor(
    private userRepository: UserInterface,
    private nodemailerService: NodemailerInterface
  ) {}

  async execute(email: string): Promise<UseCaseResponse> {
    try {
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        return { success: false, message: "no user with this mail found." };
      }

      const { otp, expiresAt: expiration } = createOTP();
      user.otp = otp;
      user.otpExpiry = expiration;
      console.log("ForgotPasswordUseCase.ts >>> OTP : ", otp);

      const subject = "SkillForge Password Reset";
      const text = "Forgot password OTP : " + otp;
      await this.nodemailerService.send(user.email as string, subject, text);
      await this.userRepository.update(user._id as string, user);

      return { success: true };
    } catch (error) {
      console.log("error in forgot password", error);
      if (error instanceof Error) {
        return { success: false, message: error.message };
      } else {
        return { success: false };
      }
    }
  }
}

export default ForgotPasswordUseCase;
