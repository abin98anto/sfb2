import { Response, Request } from "express";
import { SendOTPUseCase } from "../../../core/use-cases/user-usecases/SendOTPUseCase";
import { comments } from "../../../shared/constants/comments";
import { IUser } from "../../../core/entities/IUser";
import { VerifyOTPUseCase } from "../../../core/use-cases/user-usecases/VerifyOTPUseCase";
import { DeleteUserUseCase } from "../../../core/use-cases/user-usecases/DeleteUserUseCase";
import { LoginUserUseCase } from "../../../core/use-cases/user-usecases/LoginUserUseCase";
import { RefreshTokenUseCase } from "../../../core/use-cases/user-usecases/RefreshTokenUseCase";
import { UpdateDetailsUseCase } from "../../../core/use-cases/user-usecases/UpdateDetailsUseCase";
import ChangePasswordUseCase from "../../../core/use-cases/user-usecases/ChangePasswordUseCase";
import { GoogleAuthUseCase } from "../../../core/use-cases/user-usecases/GoogleAuthUseCase";
import ForgotPasswordUseCase from "../../../core/use-cases/user-usecases/ForgotPasswordUseCase";
import { SetNewPasswordUseCase } from "../../../core/use-cases/user-usecases/SetNewPasswordUseCase";

export class UserAuthController {
  constructor(
    private sendOTPUseCase: SendOTPUseCase,
    private verifyOTPUseCase: VerifyOTPUseCase,
    private deleteUserUseCase: DeleteUserUseCase,
    private loginUserUseCase: LoginUserUseCase,
    private refreshTokenUseCase: RefreshTokenUseCase,
    private updateDetailsUseCase: UpdateDetailsUseCase,
    private changePasswordUseCase: ChangePasswordUseCase,
    private googleAuthUseCase: GoogleAuthUseCase,
    private forgotPasswordUseCase: ForgotPasswordUseCase,
    private setNewPasswordUseCase: SetNewPasswordUseCase
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
          .cookie("accessToken", result.data.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
          })
          .cookie("refreshToken", result.data.refreshToken, {
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
        .clearCookie("accessToken", {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
        })
        .clearCookie("refreshToken", {
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
      console.log("coookkiies", req.cookies);
      const refreshToken = req.cookies["refreshToken"];
      const { data } = await this.refreshTokenUseCase.execute(refreshToken);

      res.cookie("accessToken", data.newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
      });

      console.log("new one ");
      res.status(200).json(data);
    } catch (error) {
      res.status(401).json({
        success: false,
        message:
          error instanceof Error ? error.message : comments.TOKEN_REFRESH_FAIL,
        err: error,
      });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const { user, body } = req;

      const result = await this.updateDetailsUseCase.execute(
        user._id as string,
        body as Partial<IUser>
      );

      res.status(200).json(result);
    } catch (error) {
      res.status(401).json({
        success: false,
        message: comments.USER_UPDATE_FAIL,
        err: error,
      });
    }
  };

  changePassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const { newPassword, currentPassword } = req.body;
      const data = await this.changePasswordUseCase.execute(req.user, {
        currentPassword,
        newPassword,
      });
      res.status(200).json(data);
    } catch (error) {
      res.status(501).json({
        success: false,
        message: comments.PASS_CHANGE_FAIL,
        err: error,
      });
    }
  };

  googleSignIn = async (req: Request, res: Response): Promise<void> => {
    try {
      const { token } = req.body;
      if (!token) {
        res.status(400).json({ error: comments.OAUTH_TOKEN_MISSING });
        return;
      }

      const response = await this.googleAuthUseCase.execute(token);

      const { accessToken, refreshToken } = response.data;

      res
        .cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: 24 * 60 * 60 * 1000,
        })
        .cookie("userRefresh", refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .status(200)
        .json({
          success: true,
          message: response.message,
          data: response.data,
        });
      return;
    } catch (error) {
      console.log(comments.OAUTH_FAIL, error);
      res.status(401).json({
        err: error,
        message: comments.OAUTH_FAIL,
      });
    }
  };

  forgotPasswordOTP = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email } = req.body;
      const result = await this.forgotPasswordUseCase.execute(email);
      res.status(200).json(result);
    } catch (error) {
      res.status(401).json({
        success: false,
        message: comments.FORGOT_PASS_FAIL,
        err: error,
      });
    }
  };

  resetPassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, otp, password } = req.body;
      const result = await this.setNewPasswordUseCase.execute(
        email,
        otp,
        password
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(401).json({
        success: false,
        message: comments.RESET_PASS_FAIL,
        err: error,
      });
    }
  };
}
