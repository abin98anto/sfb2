import { Router } from "express";
import ChatRepository from "../../infrastructure/repositories/ChatRepository";
import MessageRepository from "../../infrastructure/repositories/MessageRepository";
import CreateChatUseCase from "../../core/use-cases/chat-usecases/CreateChatUseCase";
import SendMessageUseCase from "../../core/use-cases/chat-usecases/SendMessageUseCase";
import GetAllChatsUseCase from "../../core/use-cases/chat-usecases/GetAllChatsUseCase";
import ChatController from "../controllers/chat-controller/ChatController";
import FindChatUseCase from "../../core/use-cases/chat-usecases/FindChatUseCase";
import GetByUserIdAndCourseId from "../../core/use-cases/chat-usecases/GetByUserIdAndCourseId";
import MarkAsReadUseCase from "../../core/use-cases/chat-usecases/MarkAsReadUseCase";
import { JwtService } from "../../infrastructure/external-services/JwtService";
import { AuthMiddleware } from "../middleware/authMiddleware";
import { MessageInterface } from "../../core/interfaces/MessageInterface";
import ChatInterface from "../../core/interfaces/ChatInterface";
import { UserInterface } from "../../core/interfaces/UserInterface";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { GetUserDetailsUseCase } from "../../core/use-cases/user-usecases/GetUserDetailsUseCase";

const chatRouter = Router();

const chatRepository: ChatInterface = new ChatRepository();
const messageRepository: MessageInterface = new MessageRepository();
const userRepository: UserInterface = new UserRepository();

const createChatUseCase = new CreateChatUseCase(chatRepository);
const sendMessageUseCase = new SendMessageUseCase(messageRepository);
const getAllChatsUseCase = new GetAllChatsUseCase(chatRepository);
const findChatUseCase = new FindChatUseCase(chatRepository);
const markAsReadUseCase = new MarkAsReadUseCase(messageRepository);
const getByUserIdAndCourseIdUseCase = new GetByUserIdAndCourseId(
  chatRepository
);
const getUserDetailsUseCase = new GetUserDetailsUseCase(userRepository);

const chatController = new ChatController(
  createChatUseCase,
  sendMessageUseCase,
  getAllChatsUseCase,
  findChatUseCase,
  getByUserIdAndCourseIdUseCase,
  markAsReadUseCase
);

const jwtService = new JwtService();
const authMiddleware = AuthMiddleware.create(jwtService, getUserDetailsUseCase);

chatRouter.get("/messages/:chatId", chatController.getMessages);
chatRouter.get("/list", chatController.getChatList);
chatRouter.post("/send", authMiddleware, chatController.sendMessage);
chatRouter.put("/mark-as-read", chatController.markAsRead);
chatRouter.post("/video-call", chatController.videoCallInvitation);

export default chatRouter;
