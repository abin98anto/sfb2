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
  RFTKN_SUCC: "New Access created successfully",
  RFTKN_FAIL: "Error in creating new access token",
  ACCESS_FAIL: "JWT Access Verification Failed",
  CAT_FETCH_FAIL: "Error in fetching categories",
  CAT_ADD_FAIL: "Error in adding category",
  CAT_UPDATE_FAIL: "Error in updating category",
  CAT_DELETE_FAIL: "Error in deleting category",
  CAT_EXISTS: "Category already exists",
  COURSE_ADD_ERR: "Error creating Course",
  COURSE_NOT_FOUND: "Course not found.",
  COURSE_FETCH_FAIL: "Fetching Course details failed.",
  COURSE_UPDATE_FAIL: "Error updating course",
  COURSES_FETCH_FAIL: "Error fetching all courses.",
  COURSE_ADD_C_FAIL: "Add course failed in controller",
  COURSE_DETAILS_FETCH_C_FAIL: "Error fetching course detailes in controller",
  COURSE_UPDATE_C_FAIL: "Error updating course in controller.",
  COURSE_TOGGLE_FAIL: "Error toggling course status",
  USER_UPDATE_FAIL: "Error updating user details",
  USERS_FETCH_FAIL: "Error fetching users",
  USERS_FETCH_SUCC: "Users fetched successfully",
  CAT_NOT_FOUND: "Category not found",
  ALL_FIELDS_REQ:"All fields are required",
};
