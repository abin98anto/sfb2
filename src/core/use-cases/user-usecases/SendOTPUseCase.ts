import { comments } from "../../../shared/constants/comments";
import { createOTP } from "../../../shared/utils/createOTP";
import hashPassword from "../../../shared/utils/hashPassword";
import { IUser } from "../../entities/IUser";
import { UseCaseResponse } from "../../entities/misc/useCaseResponse";
import { NodemailerInterface } from "../../interfaces/misc/NodemailerInterface";
import { UserInterface } from "../../interfaces/UserInterface";

export class SendOTPUseCase {
  constructor(
    private userRepository: UserInterface,
    private nodemailerService: NodemailerInterface
  ) {}

  // input: user data
  // output: sends otp to user for signup.
  execute = async (user: IUser): Promise<UseCaseResponse> => {
    try {
      const emailTaken = await this.userRepository.findByEmail(user.email);
      if (emailTaken) {
        return { success: false, message: comments.EMAIL_TAKEN };
      }

      const { otp, expiresAt } = createOTP();
      user.password = await hashPassword(user.password as string);
      user.otp = otp;
      user.otpExpiry = expiresAt;

      console.log(`OTP send to ${user.email} : ${otp}`);

      await this.nodemailerService.send(
        user.email,
        comments.OTP_SUBJECT,
        `Verify your email. OTP : ${otp}`
      );

      await this.userRepository.add(user);

      return { success: true, message: comments.OTP_SUCC };
    } catch (error) {
      console.log(comments.OTP_FAIL, error);
      return { success: false, message: comments.OTP_FAIL, err: error };
    }
  };
}
