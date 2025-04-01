"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var userSchema_1 = require("../../../infrastructure/db/schemas/userSchema");
var EnrollUserUseCase = /** @class */ (function () {
    function EnrollUserUseCase(enrollmentRepository, chatRepository, updateCourseUseCase, getCourseDetailsUseCase, getUserDetailsUseCase, updateDetailsUseCase) {
        var _this = this;
        this.enrollmentRepository = enrollmentRepository;
        this.chatRepository = chatRepository;
        this.updateCourseUseCase = updateCourseUseCase;
        this.getCourseDetailsUseCase = getCourseDetailsUseCase;
        this.getUserDetailsUseCase = getUserDetailsUseCase;
        this.updateDetailsUseCase = updateDetailsUseCase;
        this.execute = function (enrollment, user) { return __awaiter(_this, void 0, void 0, function () {
            var course, existingEnrollment, tutorStudentCounts, _i, _a, tutorId, tutorData, studentCount, selectedTutorId, lowestCount_1, tutorsWithLowestCount, randomIndex, chatId, existingChat, newRoom, updatedEnrollmentCount, newEnrollment, tutor;
            var _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.getCourseDetailsUseCase.execute(enrollment.courseId)];
                    case 1:
                        course = (_d.sent()).data;
                        return [4 /*yield*/, this.enrollmentRepository.findExisting(enrollment.userId, enrollment.courseId)];
                    case 2:
                        existingEnrollment = _d.sent();
                        if (existingEnrollment) {
                            return [2 /*return*/, existingEnrollment];
                        }
                        if (!(course === null || course === void 0 ? void 0 : course.tutors) || course.tutors.length === 0) {
                            throw new Error("No tutors available for this course");
                        }
                        tutorStudentCounts = [];
                        _i = 0, _a = course.tutors;
                        _d.label = 3;
                    case 3:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        tutorId = _a[_i];
                        return [4 /*yield*/, this.getUserDetailsUseCase.execute(tutorId.toString())];
                    case 4:
                        tutorData = (_d.sent()).data;
                        studentCount = ((_b = tutorData === null || tutorData === void 0 ? void 0 : tutorData.students) === null || _b === void 0 ? void 0 : _b.length) || 0;
                        tutorStudentCounts.push({ tutorId: tutorId.toString(), studentCount: studentCount });
                        _d.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6:
                        if (tutorStudentCounts.length === 0) {
                            throw new Error("Failed to retrieve tutor information");
                        }
                        else {
                            tutorStudentCounts.sort(function (a, b) { return a.studentCount - b.studentCount; });
                            lowestCount_1 = tutorStudentCounts[0].studentCount;
                            tutorsWithLowestCount = tutorStudentCounts.filter(function (tutor) { return tutor.studentCount === lowestCount_1; });
                            if (tutorsWithLowestCount.length > 1) {
                                randomIndex = Math.floor(Math.random() * tutorsWithLowestCount.length);
                                selectedTutorId = tutorsWithLowestCount[randomIndex].tutorId;
                            }
                            else {
                                selectedTutorId = tutorStudentCounts[0].tutorId;
                            }
                        }
                        chatId = "".concat(enrollment.userId, "-").concat(selectedTutorId, "-").concat(enrollment.courseId);
                        return [4 /*yield*/, this.chatRepository.getChatHistory(chatId)];
                    case 7:
                        existingChat = _d.sent();
                        if (!!existingChat) return [3 /*break*/, 9];
                        newRoom = {
                            _id: chatId,
                            studentId: enrollment.userId,
                            tutorId: selectedTutorId,
                            courseId: course === null || course === void 0 ? void 0 : course._id,
                            lastMessage: null,
                            unreadMessageCount: 0,
                        };
                        return [4 /*yield*/, this.chatRepository.createChat(newRoom)];
                    case 8:
                        _d.sent();
                        _d.label = 9;
                    case 9:
                        updatedEnrollmentCount = ((_c = course.data) === null || _c === void 0 ? void 0 : _c.enrollmentCount) + 1 || 1;
                        return [4 /*yield*/, this.updateCourseUseCase.execute({
                                _id: enrollment.courseId,
                                enrollmentCount: updatedEnrollmentCount,
                            })];
                    case 10:
                        _d.sent();
                        return [4 /*yield*/, this.enrollmentRepository.add(enrollment)];
                    case 11:
                        newEnrollment = _d.sent();
                        return [4 /*yield*/, userSchema_1.UserModel.findById(selectedTutorId)];
                    case 12:
                        tutor = _d.sent();
                        tutor === null || tutor === void 0 ? void 0 : tutor.students.push(newEnrollment.userId);
                        return [4 /*yield*/, (tutor === null || tutor === void 0 ? void 0 : tutor.save())];
                    case 13:
                        _d.sent();
                        return [2 /*return*/, newEnrollment];
                }
            });
        }); };
    }
    return EnrollUserUseCase;
}());
exports.default = EnrollUserUseCase;
