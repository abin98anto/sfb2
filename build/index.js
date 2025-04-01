"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var connection_1 = __importDefault(require("./infrastructure/db/connection"));
var comments_1 = require("./shared/constants/comments");
var userRoutes_1 = __importDefault(require("./presentation/routes/userRoutes"));
var categoryRoutes_1 = __importDefault(require("./presentation/routes/categoryRoutes"));
var courseRouter_1 = __importDefault(require("./presentation/routes/courseRouter"));
var adminRoutes_1 = __importDefault(require("./presentation/routes/adminRoutes"));
var subscriptionRoutes_1 = __importDefault(require("./presentation/routes/subscriptionRoutes"));
var orderRoutes_1 = __importDefault(require("./presentation/routes/orderRoutes"));
var enrollmentRoutes_1 = __importDefault(require("./presentation/routes/enrollmentRoutes"));
var chatRoutes_1 = __importDefault(require("./presentation/routes/chatRoutes"));
var SubscriptionCornJobs_1 = __importDefault(require("./shared/utils/SubscriptionCornJobs"));
var HandleExpiredSubscriptionsUseCase_1 = __importDefault(require("./core/use-cases/subscription-usecases/HandleExpiredSubscriptionsUseCase"));
var SubscriptionRepository_1 = __importDefault(require("./infrastructure/repositories/SubscriptionRepository"));
var reviewRoutes_1 = __importDefault(require("./presentation/routes/reviewRoutes"));
dotenv_1.default.config();
var app = (0, express_1.default)();
// const server = createServer(app);
// const io = initializeSocket(server);
// app.set("io", io);
// app.use(cors(corsOptions));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
console.log("first");
app.use("/", userRoutes_1.default);
app.use("/categories", categoryRoutes_1.default);
app.use("/course", courseRouter_1.default);
app.use("/admin", adminRoutes_1.default);
app.use("/subsciption", subscriptionRoutes_1.default);
app.use("/order", orderRoutes_1.default);
app.use("/enrollment", enrollmentRoutes_1.default);
app.use("/chat", chatRoutes_1.default);
app.use("/review", reviewRoutes_1.default);
// Corn job.
var subscriptionRepository = new SubscriptionRepository_1.default();
var handleExpiredSubscriptionsUseCase = new HandleExpiredSubscriptionsUseCase_1.default(subscriptionRepository);
var subscriptionCronJobs = new SubscriptionCornJobs_1.default(handleExpiredSubscriptionsUseCase);
subscriptionCronJobs.setupJobs();
var PORT = 3000;
(0, connection_1.default)().then(function () {
    // server.listen(PORT, () => {
    return app.listen(PORT, function () {
        console.log(comments_1.comments.SERVER_SUCC);
    });
});
