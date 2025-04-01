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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var subscriptionSchema_1 = __importDefault(require("../infrastructure/db/schemas/subscriptionSchema"));
var SubscriptionRepository_1 = __importDefault(require("../infrastructure/repositories/SubscriptionRepository"));
var HandleExpiredSubscriptionsUseCase_1 = __importDefault(require("../core/use-cases/subscription-usecases/HandleExpiredSubscriptionsUseCase"));
var comments_1 = require("../shared/constants/comments");
var dbURI = process.env.MONGODB_TEST_URI;
if (!dbURI) {
    throw new Error(comments_1.comments.NO_MONGO_ID);
}
var testJob = function () { return __awaiter(void 0, void 0, void 0, function () {
    var pastDate, futureDate, testSubscription, createdSubscription, repository, useCase, result, updatedSubscription, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, 7, 9]);
                console.log(comments_1.comments.MONGO_CONNECTING);
                return [4 /*yield*/, mongoose_1.default.connect(dbURI, {
                        serverSelectionTimeoutMS: 30000,
                    })];
            case 1:
                _a.sent();
                console.log(comments_1.comments.MONGO_CONNECTED);
                return [4 /*yield*/, subscriptionSchema_1.default.deleteMany({})];
            case 2:
                _a.sent();
                console.log(comments_1.comments.SUBS_DATA_CLEARED);
                pastDate = new Date();
                pastDate.setDate(pastDate.getDate() - 1);
                futureDate = new Date();
                futureDate.setDate(futureDate.getDate() + 30);
                testSubscription = {
                    name: "Test Subscription",
                    description: "For testing expiration",
                    features: {
                        hasVideoCall: true,
                        hasChat: true,
                        hasCertificate: false,
                    },
                    users: [
                        {
                            userEmail: "expired@test.com",
                            startDate: new Date(pastDate.getTime() - 30 * 24 * 60 * 60 * 1000),
                            endDate: pastDate,
                        },
                        {
                            userEmail: "active@test.com",
                            startDate: new Date(),
                            endDate: futureDate,
                        },
                    ],
                    isActive: true,
                    isDeleted: false,
                };
                return [4 /*yield*/, subscriptionSchema_1.default.create(testSubscription)];
            case 3:
                createdSubscription = _a.sent();
                console.log(comments_1.comments.DUMMY_USERS_CREATED);
                console.log(comments_1.comments.MANNUAL_TEST_EXPIRED);
                repository = new SubscriptionRepository_1.default();
                useCase = new HandleExpiredSubscriptionsUseCase_1.default(repository);
                return [4 /*yield*/, useCase.execute()];
            case 4:
                result = _a.sent();
                console.log("Use case result:", result);
                if (result.success) {
                    console.log("Removed ".concat(result.removedCount, " expired users."));
                }
                else {
                    console.log(comments_1.comments.EXPIRED_SUBS_FAIL, result.message);
                    return [2 /*return*/];
                }
                return [4 /*yield*/, subscriptionSchema_1.default.findById(createdSubscription._id)];
            case 5:
                updatedSubscription = _a.sent();
                if (updatedSubscription) {
                    console.log("Updated subscription has ".concat(updatedSubscription.users.length, " users."));
                    console.log(comments_1.comments.REMAINING_USERS, updatedSubscription.users[0].userEmail);
                    if (updatedSubscription.users.length === 1 &&
                        updatedSubscription.users[0].userEmail === "active@test.com" &&
                        result.removedCount === 1) {
                        console.log(comments_1.comments.TEST_COMPLETE);
                    }
                    else {
                        console.log(comments_1.comments.TEST_FAILED);
                    }
                }
                else {
                    console.log(comments_1.comments.TEST_FAILED_DEFAULT);
                }
                console.log(comments_1.comments.TEST_PASSED_DEFAULT);
                return [3 /*break*/, 9];
            case 6:
                error_1 = _a.sent();
                console.error(comments_1.comments.TEST_ERR, error_1 instanceof Error ? error_1.message : error_1);
                return [3 /*break*/, 9];
            case 7: return [4 /*yield*/, mongoose_1.default.disconnect()];
            case 8:
                _a.sent();
                console.log(comments_1.comments.MONGO_DISCONNECTED);
                return [7 /*endfinally*/];
            case 9: return [2 /*return*/];
        }
    });
}); };
testJob();
/*

CornJob test command: npx ts-node ./src/tests/cornJobTest.ts

*/
