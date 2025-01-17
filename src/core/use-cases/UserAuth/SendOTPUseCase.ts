import { comments } from "../../../shared/constants/comments";
import { createOTP } from "../../../shared/utils/createOTP";
import { hashPassword } from "../../../shared/utils/hashPassword";
import { IUser } from "../../entities/IUser";
import { UseCaseResponse } from "../../entities/misc/useCaseResponse";
import { MailInterface } from "../../interfaces/misc/MailInterface";
import { UserInterface } from "../../interfaces/UserInterface";

export class SendOTPUserUseCase {
  constructor(
    private userRepository: UserInterface,
    private mailService: MailInterface
  ) {}

  async execute(user: IUser): Promise<UseCaseResponse> {
    const emailTaken = await this.userRepository.findByEmail(user.email);
    if (emailTaken) {
      return { success: false, message: comments.EMAIL_TAKEN };
    }

    const { otp, expiresAt } = createOTP();
    user.password = await hashPassword(user.password as string);
    user.otp = otp;
    user.otpExpiry = expiresAt;

    console.log(`OTP send to ${user.email} : ${otp}`);

    await this.mailService.send(
      user.email,
      "SkillForge email verification",
      `Verify your email. OTP : ${otp}`
    );

    await this.userRepository.add(user);

    return { success: true, message: comments.OTP_SUCC };
  }
}
