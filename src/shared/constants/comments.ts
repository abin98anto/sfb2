import dotenv from "dotenv";
dotenv.config();

export const comments = {
  GET_COMM: "API is running...",
  SERVER_SUCC: `Server running on port http://localhost:${process.env.PORT}`,
  MONGO_SUCC: "MongoDB connected successfully!",
  MONGO_FAIL: "MongoDB connection failed:",
  CORS_FAIL: "Not allowed by CORS",
  EMAIL_TAKEN: "Email already taken.",
  OTP_SUCC: "OTP sent successfully!",
  OTP_DFLT: "111111",
  OTP_FAIL: "error sending OTP mail",
  OTP_CREATE_FAIL: "error creating OTP",
  OTP_WRONG: "Enterd OTP is incorrect.",
  OTP_EXPIRED: "OTP Expired",
  HASH_FAIL: "error hashing password",
  SERVER_ERR: "Internal server error",
  UNKOWN_ERR: "An unknown error occurred",
  USER_NOT_FOUND: "User not found.",
  USER_VERIFIED: "User Verified.",
  VERIFY_OTP_FAIL: "Error verifying OTP",
  USER_DEL_USECASE_FAIL: "Error Deleting User in UseCase.",
  USER_DEL_SUCC: "Deleted User Successfully.",
  USER_DEL_FAIL: "Error Deleting User.",
  ACCESS_INVLD: "Invalid access token",
  REFRESH_INVLD: "Invalid refresh token",
  LOGIN_UC_ERR: "Error in Login use case",
  INVALID_CRED: "Invalid credentials",
  UPDATE_USR_UC_FAIL: "Error in update user details use case",
  UPDATE_USR_SUCC: "Updated User!",
  LOGIN_SUCC: "Login Successfull",
  LOGIN_C_FAIL: "Error in login controller.",
  LOGOUT_C_FAIL: "Error in logout controller.",
  LOGOUT_SUCC: "Logout Successfull.",
  USR_DETAILS_UC_FAIL: "Error in get user details use case",
  USR_DETAILS_SUCC: "User details fetched successfully.",
  ACCSS_INVLD: "Invalid access token",
  JWT_PAYLOAD_INVLD: "Invalid token payload",
  ACCSS_NOT_FOUND: "Access token not found",
  RFTKN_NOT_FOUND: "Refresh token not found",
  RFTKN_INVLD: "Invalid refresh token",
  RFTKN_SUCC:"New Access created successfully",
  RFTKN_FAIL:"Error in creating new access token",
};
