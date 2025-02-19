import express from "express";
const userRouter = express.Router();

// User Auth
import { UserInterface } from "../../core/interfaces/UserInterface";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { NodemailerService } from "../../infrastructure/external-services/NodemailerService";
import { SendOTPUseCase } from "../../core/use-cases/user-usecases/SendOTPUseCase";
import { NodemailerInterface } from "../../core/interfaces/misc/NodemailerInterface";
import { VerifyOTPUseCase } from "../../core/use-cases/user-usecases/VerifyOTPUseCase";
import { UserAuthController } from "../controllers/user-controllers/UserAuthController";
import { API } from "../../shared/constants/API";
import { DeleteUserUseCase } from "../../core/use-cases/user-usecases/DeleteUserUseCase";
import { LoginUserUseCase } from "../../core/use-cases/user-usecases/LoginUserUseCase";
import { JwtService } from "../../infrastructure/external-services/JwtService";
import { RefreshTokenUseCase } from "../../core/use-cases/user-usecases/RefreshTokenUseCase";
import { UpdateDetailsUseCase } from "../../core/use-cases/user-usecases/UpdateDetailsUseCase";
import { AuthMiddleware } from "../middleware/authMiddleware";
import { GetUserDetailsUseCase } from "../../core/use-cases/user-usecases/GetUserDetailsUseCase";

const userRepository: UserInterface = new UserRepository();

const jwtService = new JwtService();
const nodemailerService: NodemailerInterface = new NodemailerService();
const sendOTPUseCase = new SendOTPUseCase(userRepository, nodemailerService);
const verifyOTPUseCase = new VerifyOTPUseCase(userRepository);
const deleteUserUseCase = new DeleteUserUseCase(userRepository);
const loginUserUseCase = new LoginUserUseCase(userRepository, jwtService);
const refreshTokenUseCase = new RefreshTokenUseCase(jwtService, userRepository);
const updateDetailsUseCase = new UpdateDetailsUseCase(userRepository);

const getUserDetailsUseCase = new GetUserDetailsUseCase(userRepository);

const userAuthController = new UserAuthController(
  sendOTPUseCase,
  verifyOTPUseCase,
  deleteUserUseCase,
  loginUserUseCase,
  refreshTokenUseCase,
  updateDetailsUseCase
);

const authMiddleware = AuthMiddleware.create(jwtService, getUserDetailsUseCase);

// Signup routes.
userRouter.post(API.OTP_SENT, userAuthController.sendOTP);
userRouter.post(API.OTP_VERIFY, userAuthController.verifyOTP);
userRouter.delete(API.USER_DELETE, userAuthController.deleteUser);

// Login routes.
userRouter.post(API.USER_LOGIN, userAuthController.login);
userRouter.post(API.USER_LOGOUT, userAuthController.logout);

// Refresh Access Token routes.
userRouter.post(API.USER_REFRESH, userAuthController.refreshAccessToken);

// Update user details routes.
userRouter.put(API.USER_UPDATE, authMiddleware, userAuthController.update);

export default userRouter;
