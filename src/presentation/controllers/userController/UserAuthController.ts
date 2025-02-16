import { Response, Request } from "express";
import { SendOTPUseCase } from "../../../core/use-cases/UserAuth/SendOTPUseCase";
import { comments } from "../../../shared/constants/comments";
import { IUser } from "../../../core/entities/IUser";
import { VerifyOTPUseCase } from "../../../core/use-cases/UserAuth/VerifyOTPUseCase";
import { DeleteUserUseCase } from "../../../core/use-cases/UserAuth/DeleteUserUseCase";
import { LoginUserUseCase } from "../../../core/use-cases/UserAuth/LoginUserUseCase";
import { RefreshTokenUseCase } from "../../../core/use-cases/UserAuth/RefreshTokenUseCase";

export class UserAuthController {
  constructor(
    private sendOTPUseCase: SendOTPUseCase,
    private verifyOTPUseCase: VerifyOTPUseCase,
    private deleteUserUseCase: DeleteUserUseCase,
    private loginUserUseCase: LoginUserUseCase,
    private refreshTokenUseCase: RefreshTokenUseCase
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
      const { email, otp } = req.body.data;

      const result = await this.verifyOTPUseCase.execute(
        otp as string,
        email as string
      );
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

  deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email } = req.query;

      const result = await this.deleteUserUseCase.execute(email as string);

      if (result.success) {
        res.status(200).json(result);
      } else {
        if (result.message === comments.USER_NOT_FOUND) {
          res.status(400).json(result);
        } else {
          res.status(500).json(result);
        }
      }
    } catch (error) {
      console.error(comments.USER_DEL_FAIL, error);
      res.status(400).json({ success: false, message: comments.SERVER_ERR });
    }
  };

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password, role } = req.body.userData;

      const result = await this.loginUserUseCase.execute(email, password, role);
      if (result.success) {
        res
          .cookie("access-token", result.data.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 15 * 60 * 1000,
          })
          .cookie("refresh-token", result.data.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
          })
          .status(200)
          .json({
            message: comments.LOGIN_SUCC,
            data: result.data.userData,
          });
        return;
      } else {
        res.status(401).json({ message: comments.INVALID_CRED });
        return;
      }
    } catch (error) {
      console.error(comments.LOGIN_C_FAIL, error);
      res.status(400).json({ success: false, message: comments.LOGIN_C_FAIL });
      return;
    }
  };

  logout = async (req: Request, res: Response): Promise<void> => {
    try {
      res
        .clearCookie("access-token", {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
        })
        .clearCookie("refresh-token", {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
        })
        .status(200)
        .json({ message: comments.LOGOUT_SUCC });
      return;
    } catch (error) {
      console.log(comments.LOGOUT_C_FAIL, error);
      res.status(400).json({ success: false, message: comments.LOGIN_C_FAIL });
      return;
    }
  };

  refreshAccessToken = async (req: Request, res: Response): Promise<void> => {
    try {
      const refreshToken = req.cookies["refreshToken"];

      const { data } = await this.refreshTokenUseCase.execute(refreshToken);

      res.cookie("accessToken", data.newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
      });

      res.status(200).json(data);
    } catch (error) {
      res.status(401).json({
        success: false,
        message:
          error instanceof Error ? error.message : "Token refresh failed",
        err: error,
      });
    }
  };
}
