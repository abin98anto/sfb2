"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var userRouter = express_1.default.Router();
var UserRepository_1 = require("../../infrastructure/repositories/UserRepository");
var NodemailerService_1 = require("../../infrastructure/external-services/NodemailerService");
var SendOTPUseCase_1 = require("../../core/use-cases/user-usecases/SendOTPUseCase");
var VerifyOTPUseCase_1 = require("../../core/use-cases/user-usecases/VerifyOTPUseCase");
var UserAuthController_1 = require("../controllers/user-controllers/UserAuthController");
var API_1 = require("../../shared/constants/API");
var DeleteUserUseCase_1 = require("../../core/use-cases/user-usecases/DeleteUserUseCase");
var LoginUserUseCase_1 = require("../../core/use-cases/user-usecases/LoginUserUseCase");
var JwtService_1 = require("../../infrastructure/external-services/JwtService");
var RefreshTokenUseCase_1 = require("../../core/use-cases/user-usecases/RefreshTokenUseCase");
var UpdateDetailsUseCase_1 = require("../../core/use-cases/user-usecases/UpdateDetailsUseCase");
var authMiddleware_1 = require("../middleware/authMiddleware");
var GetUserDetailsUseCase_1 = require("../../core/use-cases/user-usecases/GetUserDetailsUseCase");
var ChangePasswordUseCase_1 = __importDefault(require("../../core/use-cases/user-usecases/ChangePasswordUseCase"));
var GoogleAuthUseCase_1 = require("../../core/use-cases/user-usecases/GoogleAuthUseCase");
var CreateUserUseCase_1 = __importDefault(require("../../core/use-cases/user-usecases/CreateUserUseCase"));
var ForgotPasswordUseCase_1 = __importDefault(require("../../core/use-cases/user-usecases/ForgotPasswordUseCase"));
var SetNewPasswordUseCase_1 = require("../../core/use-cases/user-usecases/SetNewPasswordUseCase");
var userRepository = new UserRepository_1.UserRepository();
var jwtService = new JwtService_1.JwtService();
var nodemailerService = new NodemailerService_1.NodemailerService();
var sendOTPUseCase = new SendOTPUseCase_1.SendOTPUseCase(userRepository, nodemailerService);
var verifyOTPUseCase = new VerifyOTPUseCase_1.VerifyOTPUseCase(userRepository);
var deleteUserUseCase = new DeleteUserUseCase_1.DeleteUserUseCase(userRepository);
var loginUserUseCase = new LoginUserUseCase_1.LoginUserUseCase(userRepository, jwtService);
var refreshTokenUseCase = new RefreshTokenUseCase_1.RefreshTokenUseCase(jwtService, userRepository);
var updateDetailsUseCase = new UpdateDetailsUseCase_1.UpdateDetailsUseCase(userRepository);
var changePasswordUseCase = new ChangePasswordUseCase_1.default(userRepository);
var createUserUseCase = new CreateUserUseCase_1.default(userRepository);
var googleAuthUseCase = new GoogleAuthUseCase_1.GoogleAuthUseCase(createUserUseCase, userRepository, jwtService);
var forgotPasswordUseCase = new ForgotPasswordUseCase_1.default(userRepository, nodemailerService);
var setNewPasswordUseCase = new SetNewPasswordUseCase_1.SetNewPasswordUseCase(userRepository);
var getUserDetailsUseCase = new GetUserDetailsUseCase_1.GetUserDetailsUseCase(userRepository);
var userAuthController = new UserAuthController_1.UserAuthController(sendOTPUseCase, verifyOTPUseCase, deleteUserUseCase, loginUserUseCase, refreshTokenUseCase, updateDetailsUseCase, changePasswordUseCase, googleAuthUseCase, forgotPasswordUseCase, setNewPasswordUseCase);
var authMiddleware = authMiddleware_1.AuthMiddleware.create(jwtService, getUserDetailsUseCase);
// just to test if the server is working.
userRouter.get("/", function (req, res) {
    console.log("new req");
    res.status(200).json({ message: "Server is working" });
});
// Signup routes.
userRouter.post(API_1.API.OTP_SENT, userAuthController.sendOTP);
userRouter.post(API_1.API.OTP_VERIFY, userAuthController.verifyOTP);
userRouter.delete(API_1.API.USER_DELETE, userAuthController.deleteUser);
// Login routes.
userRouter.post(API_1.API.USER_LOGIN, userAuthController.login);
userRouter.post(API_1.API.USER_LOGOUT, authMiddleware, userAuthController.logout);
// Refresh Access Token routes.
userRouter.post(API_1.API.USER_REFRESH, userAuthController.refreshAccessToken);
// Update user details routes.
userRouter.put(API_1.API.USER_UPDATE, authMiddleware, userAuthController.update);
userRouter.put("/change-password", authMiddleware, userAuthController.changePassword);
userRouter.put("/forgot-password", authMiddleware, userAuthController.forgotPasswordOTP);
userRouter.put("/set-password", authMiddleware, userAuthController.resetPassword);
// Google Auth routes.
userRouter.post("/auth/google", userAuthController.googleSignIn);
exports.default = userRouter;
