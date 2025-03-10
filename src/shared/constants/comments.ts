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
  ALL_FIELDS_REQ: "All fields are required",
  MSG_SENT_SUCC: "Message sent successfully",
  MSG_SENT_FAIL: "Error sending message",
  APPROVE_TUTOR_UC_FAIL: "Error when approving tutor in usecase",
  BLOCK_UNBLOCK_UC_ERR: "Error when blocking/unblocking user in usecase",
  TUTOR_DENY_SUBJECT: "Tutor Job Application Update",
  TUTOR_DENY_UC_ERR: "error when denying tutor in usecase",
  CHAT_CREATE_UC_ERR: "Error creating chat",
  CHAT_FIND_UC_ERR: "Error finding chat",
  USER_CHAT_FETCH_UC_ERR: "Error fetching user chats in use case",
  CHAT_BY_NOID_UC_FAIL: "Error fetching chat using user id and course id",
  STUDENT_DETAIL_FETCH_FAIL: "Error fetching student details",
  MARK_AS_READ_UC_ERR: "Error in mark as read use case",
  MESSAGE_CREATE_UC_FAIL: "Error creating message in use case",
  ENROLL_DETAILS_FETCH_UC_FAIL: "Error fetching enrollment details in use case",
  ENROLL_ALL_FETCH_UC_FAIL: "Error fetching all enrollment in use case",
  ENROLL_FETCH_NOID_UC_FAIL:
    "Error fetching enrollment without enroll id in use case",
  ENROLL_UPDATE_UC_FAIL: "Error updating enrollment in use case",
  USERS_COURSE_FETCH_UC_FAIL: "Error fetching user's courses in use case",
  ENROLL_CREATE_UC_FAIL: "Error creating enrollment in use case",
  ORDER_FETCH_UC_FAIL: "Error fetching order in use case",
  USER_ORDERS_FETCH_UC_FAIL: "Error fetching user orders in use case",
  SUB_STATUS_CHECK_UC_FAIL: "Error checking subscription status in use case",
  SUB_EXIST: "Subscription already exists",
  SUB_CREATE_UC_FAIL: "Error creating subscription in use case",
  SUB_ALL_FETCH_UC_FAIL: "Error fetching all subscriptions in use case",
  SUB_EXPIRED_REMOVE_UC_FAIL: "Subscription expired and removed",
  SUB_ADD_USER_UC_FAIL: "Error adding user to subscription in use case",
  SUB_NOT_FOUND: "Subscription not found",
  SUB_UPDATE_UC_FAIL: "Error updating subscription in use case",
  INCORRECT_PASSWORD: "Current password is incorrect.",
  PASS_CHANGE_SUCC: "Password changed successfully.",
  PASS_CHANGE_UC_FAIL: "Error changing password in use case",
  USER_CREATE_UC_FAIL: "Error creating user in use case",
  FORGOT_PASS_OTP: "ForgotPasswordUseCase.ts >>> OTP : ",
  FORGOT_PASS_SUBJECT: "SkillForge Password Reset",
  FORGOT_PASS_UC_FAIL: "Error in forgot password use case",
  OAUTH_UC_FAIL: "Error in oauth use case",
  OTP_SUBJECT: "SkillForge Email Verification",
  SET_PASS_ERR: "Error in setting new password",

  // Socket.io stuffs.
  IO_CONNECTION: "connection",
  IO_JOINROOM: "joinRoom",
  IO_DISCONNECT: "disconnect",
  IO_CLIENT_CONNECT: "New client connected",
  IO_CLIENT_DISCONNECT: "Client disconnected",
  IO_RECIEVE_MSG: "recieve_message",
  IO_MSG_NOTIFICATION: "messageNotification",
  IO_CALL_INVITE: "callInvite",

  USER_BLOCK_U_ERR: "Error blocking user in controller",
  TUTOR_APPROVE_U_ERR: "Error approving tutor in controller",
  TUTOR_DENY_U_ERR: "Error denying tutor in controller",
  SUBS_ALL_C_ERR: "Error fetching all subscriptions in controller",
  SUBS_ADD_C_ERR: "Error creating subscription in controller",
  SUBS_UPDATE_C_ERR: "Error updating subscription in controller",
  SUBS_EXP_C_ERR: "Expired user subscriptions removed.",
  CHAT_ADD_C_ERR: "Error creating new chat in controller",
  MSG_FETCH_C_ERR: "Error fetching messages in controller using chatId",
  MSG_FETCH2_C_ERR:
    "Error fetching messages in controller using userId and courseId",
  CHAT_LIST_FETCH_FAIL: "Error fetching chat list in controller",
  MSG_READ_ERR: "Error marking message as read in controller",
  CALL_INVITE_SENT: "Video call invite sent to the student.",
  CALL_INVITE_FAIL: "Error sending video call invite to the student",
  STUDENT_LIST_FETCH_FAIL: "Error fetching student list in controller",
  ENROLL_ADD_FAIL: "Error enrolling the user in controller",
  ENROLL_DETAILS_FAIL: "Error details of the enrollment in controller",
  ENROLL_ALL_FAIL: "Error fetching all enrollments in controller",
  ENROLL_UPDATE_FAIL: "Error updating the enrollment in controller",
  ENROLL_USER_COURSE_ERR: "Error getting user's courses in controller.",
  ENROLL_DETAILS2_FAIL:
    "Error getting details of the enrollment using userId and courseId in controller",
  ORDER_ADD_FAIL: "Error creating order in controller",
  ORDER_USER_FETCH_FAIL: "Error fetching user's order in controller",
  ORDER_ALL_FETCH_FAIL: "Error fetching all orders in controller",
  SUB_CHECK_FAIL: "Error checking subscription status in controller",
  RZPAY_ERR: "Error creating Razorpay order",
  TOKEN_REFRESH_FAIL: "Error in refreshing token",
  PASS_CHANGE_FAIL: "Error changing password in controller",

  // Google OAuth stuffs.
  OAUTH_TOKEN_MISSING: "Goggle token missing.",
  OAUTH_FAIL: "Google sign in failed.",

  FORGOT_PASS_FAIL: "Error in forgot password in controller",
  RESET_PASS_FAIL: "Error in reset password in controller",

  // Corn job.
  CORN_INITIATED: "Subscription cron jobs initialized",
  CORN_STARTED: "Running scheduled task to remove expired subscriptions",
  CORN_TIME: "0 0 * * *",

  // Corn job test.
  MONGO_CONNECTING: "Connecting to test MongoDB...",
  MONGO_CONNECTED: "Connected to test MongoDB!",
  SUBS_DATA_CLEARED: "Cleared existing subscription data.",
  NO_MONGO_ID: "MONGODB_URI is not defined in the environment variables.",
  DUMMY_USERS_CREATED: "Test subscription created with 2 users.",
  MANNUAL_TEST_EXPIRED: "Manually testing expired subscriptions handling...",
  EXPIRED_SUBS_FAIL: "Failed to process expired subscriptions:",
  REMAINING_USERS: "Remaining user email:",
  TEST_COMPLETE: "Test passed: Expired user was removed successfully.",
  TEST_FAILED:
    "Test failed: Expired user was not removed or incorrect user remains.",
  TEST_FAILED_DEFAULT: "Test failed: Subscription not found after processing.",
  TEST_PASSED_DEFAULT: "Test completed.",
  TEST_ERR:"Error in corn job",
  MONGO_DISCONNECTED:"MongoDB disconnected",
};
