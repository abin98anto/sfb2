import { Response, Request } from "express";
import { SendOTPUseCase } from "../../../core/use-cases/UserAuth/SendOTPUseCase";
import { comments } from "../../../shared/constants/comments";
import { IUser } from "../../../core/entities/IUser";
import { VerifyOTPUseCase } from "../../../core/use-cases/UserAuth/VerifyOTPUseCase";

export class UserAuthController {
  constructor(
    private sendOTPUseCase: SendOTPUseCase,
    private verifyOTPUseCase: VerifyOTPUseCase
  ) {}

  sendOTP = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email, password, role } = req.body;
      const user: IUser = {
        name,
        email,
        password,
        role,
      };

      const result = await this.sendOTPUseCase.execute(user);

      if (result.success) {
        res.status(201).json(result);
      } else if (result.message === comments.EMAIL_TAKEN) {
        res.status(409).json(result);
      } else {
        res.status(500).json(result);
      }
    } catch (error) {
      console.log(comments.OTP_FAIL, error);
      res.status(400).json({ success: false, message: comments.SERVER_ERR });
    }
  };

  verifyOTP = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, otp } = req.body;

      const result = await this.verifyOTPUseCase.execute(otp, email);

      if (result.success) {
        res.status(200).json(result);
      } else {
        if (
          result.message === comments.OTP_EXPIRED ||
          result.message === comments.OTP_WRONG
        ) {
          res.status(400).json(result);
        } else {
          res.status(500).json(result);
        }
      }
    } catch (error) {
      console.log(comments.VERIFY_OTP_FAIL, error);
      res.status(400).json({ success: false, message: comments.SERVER_ERR });
    }
  };
}
