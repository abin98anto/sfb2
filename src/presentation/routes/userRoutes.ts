import express from "express";
const userRouter = express.Router();

// User Auth
import { UserInterface } from "../../core/interfaces/UserInterface";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { NodemailerService } from "../../infrastructure/external-services/NodemailerService";
import { SendOTPUseCase } from "../../core/use-cases/UserAuth/SendOTPUseCase";
import { NodemailerInterface } from "../../core/interfaces/misc/NodemailerInterface";
import { VerifyOTPUseCase } from "../../core/use-cases/UserAuth/VerifyOTPUseCase";
import { UserAuthController } from "../controllers/userController/UserAuthController";
import { API } from "../../shared/constants/API";
import { DeleteUserUseCase } from "../../core/use-cases/UserAuth/DeleteUserUseCase";
import { LoginUserUseCase } from "../../core/use-cases/UserAuth/LoginUserUseCase";
import { JwtService } from "../../infrastructure/external-services/JwtService";
import { UpdateDetailsUseCase } from "../../core/use-cases/UserAuth/UpdateDetailsUseCase";

const userRepository: UserInterface = new UserRepository();

const jwtService = new JwtService();
const nodemailerService: NodemailerInterface = new NodemailerService();
const sendOTPUseCase = new SendOTPUseCase(userRepository, nodemailerService);
const verifyOTPUseCase = new VerifyOTPUseCase(userRepository);
const deleteUserUseCase = new DeleteUserUseCase(userRepository);
const updateDetailsUseCase = new UpdateDetailsUseCase(userRepository);
const loginUserUseCase = new LoginUserUseCase(userRepository, jwtService);

const userAuthController = new UserAuthController(
  sendOTPUseCase,
  verifyOTPUseCase,
  deleteUserUseCase,
  loginUserUseCase
);

// Signup routes.
userRouter.post(API.OTP_SENT, userAuthController.sendOTP);
userRouter.post(API.OTP_VERIFY, userAuthController.verifyOTP);
userRouter.delete(API.USER_DELETE, userAuthController.deleteUser);

// Login routes.
userRouter.post(API.USER_LOGIN, userAuthController.login);
userRouter.post(API.USER_LOGOUT, userAuthController.logout);

export default userRouter;
