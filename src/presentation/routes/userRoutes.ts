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

const userRepository: UserInterface = new UserRepository();
const nodemailerService: NodemailerInterface = new NodemailerService();
const sendOTPUseCase = new SendOTPUseCase(userRepository, nodemailerService);
const verifyOTPUseCase = new VerifyOTPUseCase(userRepository);

const userAuthController = new UserAuthController(
  sendOTPUseCase,
  verifyOTPUseCase
);

userRouter.post(API.OTP_SENT, userAuthController.sendOTP);
userRouter.post(API.OTP_VERIFY, userAuthController.verifyOTP);

export default userRouter;
