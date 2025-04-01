"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollStatus = exports.CourseLevels = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["TUTOR"] = "tutor";
    UserRole["USER"] = "user";
})(UserRole || (exports.UserRole = UserRole = {}));
var CourseLevels;
(function (CourseLevels) {
    CourseLevels["BEGINNER"] = "Beginner";
    CourseLevels["INTERMEDIATE"] = "Intermediate";
    CourseLevels["ADVANCED"] = "Advanced";
})(CourseLevels || (exports.CourseLevels = CourseLevels = {}));
var EnrollStatus;
(function (EnrollStatus) {
    EnrollStatus["PENDING"] = "pending";
    EnrollStatus["COMPLETED"] = "completed";
    EnrollStatus["QUIT"] = "quit";
})(EnrollStatus || (exports.EnrollStatus = EnrollStatus = {}));
